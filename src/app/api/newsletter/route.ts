import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  interests: z.array(z.string()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = newsletterSchema.parse(body);

    // Check if email already exists
    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email: validatedData.email },
    });

    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return NextResponse.json(
          { message: 'Email is already subscribed to our newsletter' }, 
          { status: 400 }
        );
      } else {
        // Reactivate subscription
        await prisma.newsletterSubscriber.update({
          where: { email: validatedData.email },
          data: {
            isActive: true,
            name: validatedData.name || existingSubscriber.name,
            interests: validatedData.interests || existingSubscriber.interests,
            resubscribedAt: new Date(),
          },
        });

        return NextResponse.json(
          { message: 'Successfully resubscribed to newsletter' }, 
          { status: 200 }
        );
      }
    }

    // Create new subscriber
    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email: validatedData.email,
        name: validatedData.name || null,
        interests: validatedData.interests || [],
        isActive: true,
        subscribedAt: new Date(),
      },
    });

    // Here you could add logic to send a welcome email
    // and add the subscriber to your email marketing platform
    
    return NextResponse.json(
      { 
        message: 'Successfully subscribed to newsletter',
        id: subscriber.id 
      }, 
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          message: 'Validation error', 
          errors: error.errors 
        }, 
        { status: 400 }
      );
    }

    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { message: 'Internal server error' }, 
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { message: 'Email parameter is required' }, 
        { status: 400 }
      );
    }

    // Soft delete - mark as inactive
    const subscriber = await prisma.newsletterSubscriber.update({
      where: { email },
      data: {
        isActive: false,
        unsubscribedAt: new Date(),
      },
    });

    return NextResponse.json(
      { message: 'Successfully unsubscribed from newsletter' }, 
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter unsubscription error:', error);
    return NextResponse.json(
      { message: 'Internal server error' }, 
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Admin endpoint to get subscriber stats
    const totalSubscribers = await prisma.newsletterSubscriber.count({
      where: { isActive: true },
    });

    const recentSubscribers = await prisma.newsletterSubscriber.count({
      where: {
        isActive: true,
        subscribedAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
        },
      },
    });

    return NextResponse.json({
      totalSubscribers,
      recentSubscribers,
    });
  } catch (error) {
    console.error('Error fetching newsletter stats:', error);
    return NextResponse.json(
      { message: 'Internal server error' }, 
      { status: 500 }
    );
  }
}

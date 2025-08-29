import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Save to database
    const contact = await prisma.contact.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message,
        budget: validatedData.budget || null,
        timeline: validatedData.timeline || null,
        status: 'NEW',
        createdAt: new Date(),
      },
    });

    // Here you could add email notification logic
    // For example, using Resend, SendGrid, or another email service
    
    return NextResponse.json(
      { 
        message: 'Contact form submitted successfully',
        id: contact.id 
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

    console.error('Contact form error:', error);
    return NextResponse.json(
      { message: 'Internal server error' }, 
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Admin endpoint to get all contacts (add authentication in production)
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50, // Limit to last 50 contacts
    });

    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { message: 'Internal server error' }, 
      { status: 500 }
    );
  }
}

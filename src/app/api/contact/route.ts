import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

// Optional: simple in-memory rate limit (per runtime instance)
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // per IP per window
const recentRequests: Record<string, number[]> = {};

function rateLimit(ip: string): boolean {
  const now = Date.now();
  if (!recentRequests[ip]) recentRequests[ip] = [];
  // prune
  recentRequests[ip] = recentRequests[ip].filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);
  if (recentRequests[ip].length >= RATE_LIMIT_MAX) return false;
  recentRequests[ip].push(now);
  return true;
}

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  try {
    if (!rateLimit(ip)) {
      return NextResponse.json({ message: 'Too many requests. Please wait a moment and try again.' }, { status: 429 });
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });
    }

    const validatedData = contactSchema.parse(body);

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

    // Email sending placeholder (integrate provider e.g. Resend/SendGrid later)
    // try {
    //   await sendContactNotification(validatedData); // implement in separate module
    // } catch (notifyErr) {
    //   console.warn('Notification email failed', notifyErr);
    // }

    return NextResponse.json(
      {
        message: 'Contact form submitted successfully',
        id: contact.id,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: 'Validation error',
          errors: error.errors,
        },
        { status: 400 }
      );
    }
    console.error('Contact form error:', { ip, error });
    return NextResponse.json({ message: 'Failed to send message. Please try again or email directly.' }, { status: 500 });
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

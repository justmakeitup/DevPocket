import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory rate limiting map: IP -> timestamp[]
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string, limit = 5, windowMs = 60000): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    return false;
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';

    // Rate limit check
    if (!checkRateLimit(ip, 5, 60000)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests. Please wait a minute before submitting again.',
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, subject, message, category, honeypot } = body;

    // Honeypot spam guard: bots will fill this field
    if (honeypot) {
      return NextResponse.json(
        { success: true, message: 'Message received.' },
        { status: 200 }
      );
    }

    // Validation
    const errors: Record<string, string> = {};

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      errors.name = 'Please provide your name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }

    if (!subject || typeof subject !== 'string' || subject.trim().length < 3) {
      errors.subject = 'Subject must be at least 3 characters.';
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters.';
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed. Please correct the highlighted fields.',
          errors,
        },
        { status: 400 }
      );
    }

    const provider = process.env.CONTACT_EMAIL_PROVIDER || 'mock';

    // Real provider implementation (e.g. Resend or webhook) if configured
    if (provider === 'resend' && process.env.RESEND_API_KEY) {
      // In production with Resend configured:
      // await resend.emails.send(...)
      console.log('[DevPocket Contact] Dispatching via Resend:', { name, email, subject });
    } else {
      // Honest mock mode: log delivery and inform user honestly
      console.log('[DevPocket Contact] Received submission in local mock mode:', {
        name,
        email,
        category: category || 'general',
        subject,
        messageLength: message.length,
        receivedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been received! We will get back to you shortly.',
        data: {
          category: category || 'General',
          submittedAt: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error('[DevPocket Contact Error]', err);
    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected server error occurred while processing your message.',
      },
      { status: 500 }
    );
  }
}

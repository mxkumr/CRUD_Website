import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, interests, website } = body as {
      name?: string;
      email?: string;
      message?: string;
      interests?: string[];
      website?: string;
    };

    // Honeypot - bots fill hidden fields; pretend success.
    if (website) return NextResponse.json({ ok: true });

    const trimmedName = name?.trim() ?? '';
    const trimmedEmail = email?.trim() ?? '';
    const trimmedMessage = message?.trim() ?? '';
    const interestList = Array.isArray(interests)
      ? interests.filter((i): i is string => typeof i === 'string').slice(0, 12)
      : [];

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 });
    }

    if (!EMAIL_RE.test(trimmedEmail)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (trimmedMessage.length > 5000) {
      return NextResponse.json({ error: 'Message is too long.' }, { status: 400 });
    }

    await sendContactEmail({
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
      interests: interestList,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact]', err);
    return NextResponse.json(
      { error: 'Could not send your message. Please email us directly or try again later.' },
      { status: 500 },
    );
  }
}

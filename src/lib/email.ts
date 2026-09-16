import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import { contact } from '@/lib/site-data';

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  interests: string[];
  region?: string;
  budget?: string;
};

function resendConfigured() {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

function smtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function buildMessage(payload: ContactPayload) {
  const interestLine = payload.interests.length ? payload.interests.join(', ') : '-';
  const regionLine = payload.region?.trim() || '-';
  const budgetLine = payload.budget?.trim() || '-';

  const text = [
    'New project inquiry from the CRUD Studio website',
    '',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Looking for: ${interestLine}`,
    `Based in: ${regionLine}`,
    `Budget: ${budgetLine}`,
    '',
    'Message:',
    payload.message,
  ].join('\n');

  const html = `
    <h2>New project inquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Email:</strong> <a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></p>
    <p><strong>Looking for:</strong> ${escapeHtml(interestLine)}</p>
    <p><strong>Based in:</strong> ${escapeHtml(regionLine)}</p>
    <p><strong>Budget:</strong> ${escapeHtml(budgetLine)}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(payload.message)}</p>
  `;

  return {
    subject: `New project inquiry - ${payload.name}`,
    text,
    html,
  };
}

async function sendWithResend(payload: ContactPayload) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const to = process.env.CONTACT_TO ?? contact.email;
  const from =
    process.env.RESEND_FROM?.trim() ||
    process.env.SMTP_FROM?.trim() ||
    'CRUD Studio <onboarding@resend.dev>';
  const { subject, text, html } = buildMessage(payload);

  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: payload.email,
    subject,
    text,
    html,
  });

  if (error) {
    throw new Error(error.message || 'Resend failed to send email.');
  }

  return data;
}

async function sendWithSmtp(payload: ContactPayload) {
  const port = Number(process.env.SMTP_PORT ?? 587);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const to = process.env.CONTACT_TO ?? contact.email;
  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER!;
  const { subject, text, html } = buildMessage(payload);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from,
    to,
    replyTo: payload.email,
    subject,
    text,
    html,
  });
}

/** Prefer Resend; fall back to SMTP if Resend is not configured. */
export async function sendContactEmail(payload: ContactPayload) {
  if (resendConfigured()) {
    await sendWithResend(payload);
    return;
  }

  if (smtpConfigured()) {
    await sendWithSmtp(payload);
    return;
  }

  throw new Error(
    'Email is not configured. Set RESEND_API_KEY (preferred) or SMTP_* variables.',
  );
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

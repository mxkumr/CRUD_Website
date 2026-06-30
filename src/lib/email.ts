import nodemailer from 'nodemailer';
import { contact } from '@/lib/site-data';

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  interests: string[];
};

function smtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function createTransport() {
  const port = Number(process.env.SMTP_PORT ?? 587);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendContactEmail(payload: ContactPayload) {
  if (!smtpConfigured()) {
    throw new Error('SMTP is not configured. Add SMTP_* variables to your environment.');
  }

  const to = process.env.CONTACT_TO ?? contact.email;
  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER!;
  const interestLine = payload.interests.length ? payload.interests.join(', ') : '-';

  const text = [
    'New project inquiry from the CRUD Studio website',
    '',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Interested in: ${interestLine}`,
    '',
    'Message:',
    payload.message,
  ].join('\n');

  const html = `
    <h2>New project inquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Email:</strong> <a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></p>
    <p><strong>Interested in:</strong> ${escapeHtml(interestLine)}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(payload.message)}</p>
  `;

  const transporter = createTransport();
  await transporter.sendMail({
    from,
    to,
    replyTo: payload.email,
    subject: `New project inquiry - ${payload.name}`,
    text,
    html,
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

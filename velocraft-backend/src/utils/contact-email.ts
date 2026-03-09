import type {Contact} from '../models/contact.model';
import {EmailService} from '../services/email.service';

function getContactEmail(): string {
  return process.env.CONTACT_EMAIL ?? 'contact@velocrafts.tech';
}
const emailService = new EmailService();

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (c) => map[c] ?? c);
}

function buildContactEmailHtml(contact: Contact): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5; padding: 24px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); overflow: hidden;">
    <div style="background: #153A5B; color: #ffffff; padding: 24px 28px;">
      <h1 style="margin: 0; font-size: 22px; font-weight: 700;">New Contact Form Submission</h1>
      <p style="margin: 8px 0 0; font-size: 14px; opacity: 0.9;">Velocrafts Technologies</p>
    </div>
    <div style="padding: 28px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #153A5B; width: 140px;">Name</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333;">${escapeHtml(contact.name)}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #153A5B;">Email</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333; word-break: break-all; overflow-wrap: break-word;"><a href="mailto:${escapeHtml(contact.email)}" style="color: #153A5B; word-break: break-all; overflow-wrap: break-word;">${escapeHtml(contact.email)}</a></td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #153A5B;">Company</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333;">${contact.company ? escapeHtml(contact.company) : '—'}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #153A5B;">Service Interest</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333;">${contact.service ? escapeHtml(contact.service) : '—'}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0 4px; font-weight: 600; color: #153A5B; vertical-align: top;" colspan="2">Message</td>
        </tr>
        <tr>
          <td colspan="2" style="padding: 4px 0 12px; color: #333; white-space: pre-wrap; border-bottom: 1px solid #eee;">${escapeHtml(contact.message)}</td>
        </tr>
      </table>
    </div>
    <div style="background: #f8f9fa; padding: 16px 28px; font-size: 12px; color: #666;">
      Reply to this email to respond directly to the user. The user's email is set as Reply-To.
    </div>
  </div>
</body>
</html>
`.trim();
}

function buildContactEmailText(contact: Contact): string {
  return [
    `Name: ${contact.name}`,
    `Email: ${contact.email}`,
    `Company: ${contact.company ?? '—'}`,
    `Service Interest: ${contact.service ?? '—'}`,
    '',
    'Message:',
    contact.message,
  ].join('\n');
}

/**
 * Sends a contact form notification to CONTACT_EMAIL (contact@velocrafts.tech).
 * - From: SMTP account (set SMTP_USER to contact@velocrafts.tech so sender is contact@velocrafts.tech).
 * - To: contact@velocrafts.tech (CONTACT_EMAIL in .env).
 * - Reply-To: submitter's email so replying goes to the user.
 * - Content: Name, Email, Company, Service Interest, Message. Subject: "New Contact Form Submission".
 * Does not throw; errors are logged inside EmailService.
 */
export async function sendContactNotification(contact: Contact): Promise<void> {
  const toEmail = getContactEmail();
  const sent = await emailService.sendMail({
    to: toEmail,
    subject: 'New Contact Form Submission',
    html: buildContactEmailHtml(contact),
    text: buildContactEmailText(contact),
    replyTo: contact.email,
  });
  if (sent) {
    console.log('[contact-email] Notification sent to', toEmail);
  }
}

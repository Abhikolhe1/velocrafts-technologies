import nodemailer from 'nodemailer';
import type {Transporter} from 'nodemailer';

/**
 * Reusable email service using Nodemailer.
 * Configuration is read from .env:
 *   SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS
 *   Optional: MAIL_FROM, MAIL_FROM_NAME
 */
export interface SendMailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  from?: string;
  fromName?: string;
}

export class EmailService {
  private _transporter: Transporter | null = null;

  private getConfig(): {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    pass: string;
    from: string;
    fromName: string;
  } | null {
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (!host || !user || !pass) return null;
    const port = parseInt(process.env.SMTP_PORT ?? '587', 10);
    const secure = process.env.SMTP_SECURE === 'true';
    const from = process.env.MAIL_FROM ?? user;
    const fromName = process.env.MAIL_FROM_NAME ?? 'Velocrafts Technologies';
    return {host, port, secure, user, pass, from, fromName};
  }

  /**
   * Returns a Nodemailer transporter or null if SMTP is not configured.
   */
  getTransporter(): Transporter | null {
    if (this._transporter) return this._transporter;
    const config = this.getConfig();
    if (!config) return null;
    this._transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {user: config.user, pass: config.pass},
    });
    return this._transporter;
  }

  /**
   * Returns true if SMTP is configured and email can be sent.
   */
  isConfigured(): boolean {
    return this.getConfig() != null;
  }

  /**
   * Sends an email. No-op if SMTP is not configured; errors are logged, not thrown.
   */
  async sendMail(options: SendMailOptions): Promise<boolean> {
    const transporter = this.getTransporter();
    const config = this.getConfig();
    if (!transporter || !config) {
      console.warn(
        '[EmailService] SMTP not configured (SMTP_HOST, SMTP_USER, SMTP_PASS). Skip sending email.',
      );
      return false;
    }

    const from = options.from ?? config.from;
    const fromName = options.fromName ?? config.fromName;

    try {
      await transporter.sendMail({
        from: `"${fromName}" <${from}>`,
        to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
        replyTo: options.replyTo,
      });
      return true;
    } catch (err: unknown) {
      const e = err as {message?: string; response?: string; code?: string};
      console.error('[EmailService] Send failed:', e.message ?? err);
      if (e.response) console.error('[EmailService] SMTP response:', e.response);
      if (e.code) console.error('[EmailService] Code:', e.code);
      return false;
    }
  }
}

import {inject} from '@loopback/core';
import {
  HttpErrors,
  post,
  requestBody,
  response,
  ResponseObject,
  RestBindings,
} from '@loopback/rest';
import * as https from 'https';
import {Contact} from '../models/contact.model';
import {ContactRepository} from '../repositories/contact.repository';

const CONTACT_RESPONSE: ResponseObject = {
  description: 'Contact submission response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          success: {type: 'boolean'},
          message: {type: 'string'},
          id: {type: 'number'},
        },
      },
    },
  },
};

interface ContactRequestBody extends Omit<Contact, 'id'> {
  turnstileToken?: string;
}

async function verifyTurnstile(
  token: string,
  remoteip?: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    throw new Error('TURNSTILE_SECRET_KEY is not configured');
  }
  const body = new URLSearchParams({
    secret,
    response: token,
    ...(remoteip && {remoteip}),
  }).toString();

  return new Promise(resolve => {
    const req = https.request(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(body),
        },
      },
      res => {
        let data = '';
        res.on('data', chunk => (data += chunk.toString()));
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data) as {success?: boolean};
            resolve(!!parsed.success);
          } catch {
            resolve(false);
          }
        });
      },
    );
    req.on('error', () => resolve(false));
    req.write(body);
    req.end();
  });
}

export class ContactController {
  constructor(
    @inject('repositories.ContactRepository')
    public contactRepository: ContactRepository,
    @inject(RestBindings.Http.REQUEST)
    private req: {
      headers: Record<string, unknown>;
      socket?: {remoteAddress?: string};
    },
  ) {}

  @post('/contacts')
  @response(201, CONTACT_RESPONSE)
  @response(400, {description: 'Invalid or missing Turnstile verification'})
  async create(@requestBody() body: ContactRequestBody): Promise<object> {
    const {turnstileToken, ...contact} = body;
    if (!turnstileToken) {
      throw new HttpErrors.BadRequest(
        'Verification required. Please complete the captcha.',
      );
    }
    const remoteip =
      (this.req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      this.req.socket?.remoteAddress;
    const valid = await verifyTurnstile(turnstileToken, remoteip);
    if (!valid) {
      throw new HttpErrors.BadRequest('Verification failed. Please try again.');
    }
    const created = await this.contactRepository.create(contact);
    return {
      success: true,
      message: 'Thank you for reaching out! We will get back to you soon.',
      id: created.id,
    };
  }
}

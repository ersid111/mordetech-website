import { NextResponse } from 'next/server';
import { validateLead } from '@/lib/lead-schema';

export const runtime = 'nodejs';

/**
 * Lead delivery.
 *
 * LEAD_WEBHOOK_URL is any endpoint that accepts a JSON POST — a Formspree form,
 * a CRM webhook, or your own handler. When it is unset the route still validates
 * and responds honestly with `delivered: false`, and the form tells the visitor
 * to use WhatsApp or email instead. It never reports success for a message that
 * went nowhere, which is exactly what the previous site did.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, errors: { form: 'Malformed request.' } }, { status: 400 });
  }

  const result = validateLead(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 400 });
  }

  const endpoint = process.env.LEAD_WEBHOOK_URL;
  if (!endpoint) {
    return NextResponse.json(
      {
        ok: false,
        delivered: false,
        errors: {
          form:
            'This form is not connected to an inbox yet. Please WhatsApp or email us and we will reply the same way.',
        },
      },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...result.data,
        source: 'mordetech.com',
        receivedAt: new Date().toISOString(),
      }),
    });
    if (!res.ok) throw new Error(`Upstream responded ${res.status}`);
    return NextResponse.json({ ok: true, delivered: true });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        delivered: false,
        errors: { form: 'We could not send that just now. Please WhatsApp or email us directly.' },
      },
      { status: 502 },
    );
  }
}

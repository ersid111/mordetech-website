import { describe, it, expect } from 'vitest';
import { validateLead, MIN_FILL_MS } from '@/lib/lead-schema';

const valid = {
  name: 'Rakesh Sharma',
  company: 'Example Forge',
  email: 'rakesh@example.com',
  phone: '+91 98765 43210',
  interest: 'AI Vision Inspection',
  message: 'We need vision inspection on two stamping lines.',
  website: '',
  renderedAt: 0,
};

describe('validateLead', () => {
  it('accepts a complete, plausible enquiry', () => {
    const r = validateLead(valid);
    expect(r.ok).toBe(true);
  });

  it('requires the fields a reply depends on', () => {
    const r = validateLead({ ...valid, name: '', email: '', phone: '', message: '' });
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(Object.keys(r.errors).sort()).toEqual(['email', 'message', 'name', 'phone']);
    }
  });

  it('rejects a malformed email', () => {
    const r = validateLead({ ...valid, email: 'rakesh@' });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.email).toMatch(/does not look right/);
  });

  it('allows international phone formats', () => {
    for (const phone of ['+91 98765 43210', '(020) 2293-4455', '9404030215']) {
      expect(validateLead({ ...valid, phone }).ok).toBe(true);
    }
  });

  it('rejects a phone number containing letters', () => {
    const r = validateLead({ ...valid, phone: 'call me' });
    expect(r.ok).toBe(false);
  });

  it('treats a filled honeypot as a bot', () => {
    const r = validateLead({ ...valid, website: 'http://spam.example' });
    expect(r.ok).toBe(false);
  });

  it('rejects submissions faster than a human could type', () => {
    const now = 1_000_000;
    const r = validateLead({ ...valid, renderedAt: now - (MIN_FILL_MS - 500) }, now);
    expect(r.ok).toBe(false);
  });

  it('accepts a submission after a realistic fill time', () => {
    const now = 1_000_000;
    const r = validateLead({ ...valid, renderedAt: now - (MIN_FILL_MS + 4000) }, now);
    expect(r.ok).toBe(true);
  });

  it('does not require optional fields', () => {
    const r = validateLead({ ...valid, company: '', interest: '' });
    expect(r.ok).toBe(true);
  });

  it('rejects an over-long message rather than truncating it', () => {
    const r = validateLead({ ...valid, message: 'x'.repeat(4001) });
    expect(r.ok).toBe(false);
  });
});

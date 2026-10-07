import { z } from 'zod';

/**
 * One schema, used by the browser and by the API route. Client validation is a
 * convenience; the server re-validates because a client check is advice, not a
 * guarantee — a form can be posted directly.
 */
export const leadSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(120),
  company: z.string().trim().max(160).optional().or(z.literal('')),
  email: z.string().trim().email('That email address does not look right.').max(200),
  phone: z
    .string()
    .trim()
    .min(7, 'Please enter a phone number we can reach you on.')
    .max(32)
    .regex(/^[+()\d\s-]+$/, 'Phone numbers can contain digits, spaces, + ( ) and -.'),
  interest: z.string().trim().max(80).optional().or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(10, 'Please tell us a little about the plant or the problem.')
    .max(4000),
  /** Honeypot: a real person never sees this field, so anything in it is a bot.
   *  Chosen over a CAPTCHA, which taxes every legitimate buyer to stop some bots. */
  website: z.string().max(0, 'Rejected.').optional().or(z.literal('')),
  /** Time the form was rendered. Submissions faster than a human could type are
   *  rejected; this catches scripted posts without troubling real visitors. */
  renderedAt: z.coerce.number().int().nonnegative().optional(),
});

export type Lead = z.infer<typeof leadSchema>;

export const MIN_FILL_MS = 3000;

export type ValidationResult =
  | { ok: true; data: Lead }
  | { ok: false; errors: Record<string, string> };

export function validateLead(input: unknown, now = Date.now()): ValidationResult {
  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form');
      if (!errors[key]) errors[key] = issue.message;
    }
    return { ok: false, errors };
  }
  const data = parsed.data;

  if (data.website) return { ok: false, errors: { form: 'Rejected.' } };

  if (typeof data.renderedAt === 'number' && data.renderedAt > 0) {
    if (now - data.renderedAt < MIN_FILL_MS) {
      return { ok: false, errors: { form: 'That was submitted unusually quickly. Please try again.' } };
    }
  }
  return { ok: true, data };
}

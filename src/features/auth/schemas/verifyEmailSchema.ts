import z from 'zod';

export const verifyEmailSchema = z.object({
  token: z.string().trim(),
});

export type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>;

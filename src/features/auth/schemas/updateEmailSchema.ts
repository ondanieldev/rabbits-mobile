import z from 'zod';

export const updateEmailSchema = z.object({
  email: z.string().trim().email(),
});

export type UpdateEmailSchema = z.infer<typeof updateEmailSchema>;

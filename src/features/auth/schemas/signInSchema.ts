import z from 'zod';

export const signInSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(5),
});

export type SignInSchema = z.infer<typeof signInSchema>;

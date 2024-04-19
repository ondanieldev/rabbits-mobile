import z from 'zod';

export const signUpSchema = z
  .object({
    email: z.string().trim().email(),
    password: z.string().min(5),
    confirmPassword: z.string().min(5),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;

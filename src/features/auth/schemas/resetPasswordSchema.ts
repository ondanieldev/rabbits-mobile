import z from 'zod';

export const resetPasswordGenerateTokenSchema = z.object({
  email: z.string().trim().email(),
});

export const resetPasswordValidateTokenSchema = z.object({
  email: z.string().trim().email(),
  token: z.string().trim(),
});

export const resetPasswordSchema = z
  .object({
    email: z.string().trim().email(),
    token: z.string().trim(),
    password: z.string().min(5),
    confirmPassword: z.string().min(5),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordGenerateTokenSchema = z.infer<
  typeof resetPasswordGenerateTokenSchema
>;

export type ResetPasswordValidateTokenSchema = z.infer<
  typeof resetPasswordValidateTokenSchema
>;

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

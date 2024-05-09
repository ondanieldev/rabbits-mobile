import z from 'zod';

export const createReminderSchema = z.object({
  name: z.string().trim().min(1),
  daysOfWeek: z.array(z.number().int().min(1).max(7)).nonempty(),
});

export type CreateReminderSchema = z.infer<typeof createReminderSchema>;

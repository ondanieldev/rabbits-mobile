import z from 'zod';

export const createReminderSchema = z.object({
  name: z.string().trim().min(5),
  daysOfWeek: z.array(z.number().int().min(1).max(7)).nonempty(),
});

export type CreateReminderSchema = z.infer<typeof createReminderSchema>;

import z from 'zod';

export const createHabitSchema = z.object({
  name: z.string().trim().min(5),
  daysOfWeek: z.array(z.number().int().min(1).max(7)).nonempty(),
  time: z.date(),
});

export type CreateHabitSchema = z.infer<typeof createHabitSchema>;

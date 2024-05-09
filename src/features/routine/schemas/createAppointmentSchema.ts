import z from 'zod';

export const createAppointmentSchema = z.object({
  name: z.string().trim().min(1),
  date: z.date(),
  time: z.date(),
});

export type CreateAppointmentSchema = z.infer<typeof createAppointmentSchema>;

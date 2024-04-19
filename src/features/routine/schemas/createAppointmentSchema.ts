import z from 'zod';

export const createAppointmentSchema = z.object({
  name: z.string().trim().min(5),
  date: z.date(),
  time: z.date(),
});

export type CreateAppointmentSchema = z.infer<typeof createAppointmentSchema>;

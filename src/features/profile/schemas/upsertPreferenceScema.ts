import z from 'zod';

export const upsertPreferenceSchema = z.object({
  isNotificationEnabled: z.boolean(),
  isSoundEnabled: z.boolean(),
  isVibrationEnabled: z.boolean(),
});

export type UpsertPreferenceSchema = z.infer<typeof upsertPreferenceSchema>;

export const asyncStatuses = [
  'idle',
  'pending',
  'fulfilled',
  'rejected',
] as const;

export type AsyncStatus = (typeof asyncStatuses)[number];

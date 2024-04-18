export const taskKinds = ['habit', 'reminder'] as const;
export type TaskKind = (typeof taskKinds)[number];

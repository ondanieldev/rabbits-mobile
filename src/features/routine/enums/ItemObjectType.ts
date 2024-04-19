export const itemObjectTypes = ['task', 'appointment'] as const;

export type ItemObjectType = (typeof itemObjectTypes)[number];

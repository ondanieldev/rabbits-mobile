export const itemCreatableTypes = ['habit', 'reminder', 'event'] as const;

export type ItemCreatableType = (typeof itemCreatableTypes)[number];

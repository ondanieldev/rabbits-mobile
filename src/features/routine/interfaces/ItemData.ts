import { TaskKind } from '../enums/TaskKind';

export type ItemObjectType = 'task' | 'appointment';

export interface ItemData {
  objectType: ItemObjectType;
  id: string;
  name: string;
  date?: Date;
  showDate?: boolean;
  showTime?: boolean;
  isCompleted?: boolean;
  kind?: TaskKind;
  daysOfWeek?: number[];
}

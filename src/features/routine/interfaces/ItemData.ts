import { ItemObjectType } from '../enums/ItemObjectType';
import { TaskKind } from '../enums/TaskKind';

export interface ItemData {
  objectType: ItemObjectType;
  id: string;
  name: string;
  date?: Date;
  showDate?: boolean;
  showTime?: boolean;
  isCompleted?: boolean;
  completedRefId?: string;
  kind?: TaskKind;
  daysOfWeek?: number[];
  isNotificationEnabled: boolean;
  isSoundEnabled: boolean;
}

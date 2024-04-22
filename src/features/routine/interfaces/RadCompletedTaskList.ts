import { OffsetPaginationQuery } from '../../../shared/interfaces/OffsetPaginationQuery';
import { ReadCompletedTask } from './ReadCompletedTask';

export type ReadCompletedTaskList = ReadCompletedTask & OffsetPaginationQuery;

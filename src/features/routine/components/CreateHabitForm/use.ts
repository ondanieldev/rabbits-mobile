import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';

import { CreateHabitFormProps } from '.';
import { useDispatch } from '../../../../shared/hooks/useDispatch';
import { StackNavigationProp } from '../../../../shared/navigation/stack';
import { DateUtils } from '../../../../shared/utils/DateUtils';
import { ErrorHandler } from '../../../error/services/ErrorHandler';
import { useToast } from '../../../toast/contexts/toastContext';
import {
  toastErrorCreateHabit,
  toastErrorUpdateHabit,
  toastSuccessCreateHabit,
  toastSuccessUpdateHabit,
} from '../../../toast/data/toastTemplates';
import {
  CreateHabitSchema,
  createHabitSchema,
} from '../../schemas/createHabitSchema';
import { createTask, updateTask } from '../../stores/taskStore';

export const useCreateHabitForm = ({ editingHabit }: CreateHabitFormProps) => {
  /**
   * Toast setup
   */
  const { toastify } = useToast();

  /**
   * Navigation setup
   */
  const navigation = useNavigation<StackNavigationProp>();

  /**
   * Redux setup
   */
  const dispatch = useDispatch();

  /**
   * Form setup
   */
  const form = useForm<CreateHabitSchema>({
    resolver: zodResolver(createHabitSchema),
    defaultValues: editingHabit
      ? {
          name: editingHabit.name,
          daysOfWeek: editingHabit.daysOfWeek,
          time: DateUtils.buildDate({
            hour: editingHabit.hours,
            minute: editingHabit.minutes,
          }),
        }
      : {
          name: '',
          daysOfWeek: [],
          time: new Date(),
        },
    mode: 'onSubmit',
  });

  /**
   * Create habit
   */
  const handleCreate = useCallback(
    async (data: CreateHabitSchema) => {
      try {
        await dispatch(
          createTask({
            daysOfWeek: data.daysOfWeek,
            hours: data.time.getHours(),
            minutes: data.time.getMinutes(),
            name: data.name,
            kind: 'habit',
          }),
        ).unwrap();
        form.reset();
        toastify(toastSuccessCreateHabit);
      } catch (err) {
        const message = ErrorHandler.handle(err);
        toastify(toastErrorCreateHabit(message));
      }
    },
    [dispatch, form, toastify],
  );

  /**
   * Update habit
   */
  const handleUpdate = useCallback(
    async (data: CreateHabitSchema) => {
      if (!editingHabit) {
        return;
      }
      try {
        await dispatch(
          updateTask({
            id: editingHabit.id,
            daysOfWeek: data.daysOfWeek,
            hours: data.time.getHours(),
            minutes: data.time.getMinutes(),
            name: data.name,
            kind: 'habit',
          }),
        ).unwrap();
        navigation.goBack();
        toastify(toastSuccessUpdateHabit);
      } catch (err) {
        const message = ErrorHandler.handle(err);
        toastify(toastErrorUpdateHabit(message));
      }
    },
    [dispatch, editingHabit, navigation, toastify],
  );

  /**
   * Create or update habit
   */
  const onSubmit = useCallback<SubmitHandler<CreateHabitSchema>>(
    data => {
      if (editingHabit) {
        handleUpdate(data);
      } else {
        handleCreate(data);
      }
    },
    [handleCreate, handleUpdate, editingHabit],
  );

  return {
    form,
    onSubmit,
  };
};

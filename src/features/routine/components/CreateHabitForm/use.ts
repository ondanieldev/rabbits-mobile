import { useCallback, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';

import { CreateHabitFormProps } from '.';
import { useDispatch } from '../../../../shared/hooks/useDispatch';
import { StackNavigationProp } from '../../../../shared/navigation/stack';
import {
  CreateHabitSchema,
  createHabitSchema,
} from '../../schemas/createHabitSchema';
import { createTask, updateTask } from '../../stores/taskStore';

export const useCreateHabitForm = ({ editingHabit }: CreateHabitFormProps) => {
  /**
   * Translation
   */
  const { t } = useTranslation('routine');
  const nameLabel = useMemo(() => t('name'), [t]);
  const timeLabel = useMemo(() => t('time'), [t]);
  const daysOfWeekLabel = useMemo(() => t('daysOfWeek'), [t]);
  const buttonText = useMemo(() => t('save'), [t]);

  /**
   * Navigation
   */
  const navigation = useNavigation<StackNavigationProp>();

  /**
   * Redux dispatch
   */
  const dispatch = useDispatch();

  /**
   * Formating
   */
  const formatTime = useCallback((date: Date) => format(date, 'HH:mm'), []);

  /**
   * Form
   */
  const form = useForm<CreateHabitSchema>({
    resolver: zodResolver(createHabitSchema),
    defaultValues: editingHabit
      ? {
          name: editingHabit.name,
          daysOfWeek: editingHabit.daysOfWeek,
          time: new Date(
            new Date().setHours(editingHabit.hours, editingHabit.minutes),
          ),
        }
      : {
          name: '',
          daysOfWeek: [],
          time: new Date(),
        },
    mode: 'onSubmit',
  });

  /**
   * Create habit callback
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
      } catch {
        //
      }
    },
    [dispatch, form],
  );

  /**
   * Update habit callback
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
      } catch {
        //
      }
    },
    [dispatch, editingHabit, navigation],
  );

  /**
   * Submit form
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
    nameLabel,
    timeLabel,
    daysOfWeekLabel,
    buttonText,
    formatTime,
    form,
    onSubmit,
  };
};

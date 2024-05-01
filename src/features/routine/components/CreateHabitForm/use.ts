import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';

import { CreateHabitFormProps } from '.';
import { useDispatch } from '../../../../shared/hooks/useDispatch';
import { StackNavigationProp } from '../../../../shared/navigation/stack';
import { ErrorHandler } from '../../../error/services/ErrorHandler';
import { useProfile } from '../../../profile/contexts/profileContext';
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
import { getInitialValues, transformData } from './data';

export const useCreateHabitForm = ({ editingHabit }: CreateHabitFormProps) => {
  /**
   * Profile setup
   */
  const { profile } = useProfile();

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
    defaultValues: getInitialValues({ profile, editingHabit }),
    mode: 'onSubmit',
  });

  /**
   * Create habit
   */
  const handleCreate = useCallback(
    async (data: CreateHabitSchema) => {
      try {
        await dispatch(createTask(transformData(data))).unwrap();
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
            ...transformData(data),
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

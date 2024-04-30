import { useCallback, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';

import { CreateReminderFormProps } from '.';
import { useDispatch } from '../../../../shared/hooks/useDispatch';
import { useSelector } from '../../../../shared/hooks/useSelector';
import { StackNavigationProp } from '../../../../shared/navigation/stack';
import { ErrorHandler } from '../../../error/services/ErrorHandler';
import { useToast } from '../../../toast/contexts/toastContext';
import {
  toastErrorCreateReminder,
  toastErrorUpdateReminder,
  toastSuccessCreateReminder,
  toastSuccessUpdateReminder,
} from '../../../toast/data/toastTemplates';
import {
  CreateReminderSchema,
  createReminderSchema,
} from '../../schemas/createReminderSchema';
import { createTask, updateTask } from '../../stores/taskStore';

export const useCreateReminderForm = ({
  ediditingReminder,
}: CreateReminderFormProps) => {
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
  const form = useForm<CreateReminderSchema>({
    resolver: zodResolver(createReminderSchema),
    defaultValues: ediditingReminder
      ? {
          name: ediditingReminder.name,
          daysOfWeek: ediditingReminder.daysOfWeek,
        }
      : {
          name: '',
          daysOfWeek: [],
        },
    mode: 'onSubmit',
  });

  /**
   * Create reminder
   */
  const createTaskStatus = useSelector(state => state.task.createTaskStatus);

  const handleCreate = useCallback(
    async (data: CreateReminderSchema) => {
      try {
        await dispatch(
          createTask({
            daysOfWeek: data.daysOfWeek,
            kind: 'reminder',
            name: data.name,
            hours: 0,
            minutes: 0,
          }),
        ).unwrap();
        form.reset();
        toastify(toastSuccessCreateReminder);
      } catch (err) {
        const message = ErrorHandler.handle(err);
        toastify(toastErrorCreateReminder(message));
      }
    },
    [dispatch, form, toastify],
  );

  /**
   * Update reminder
   */
  const updateTaskStatus = useSelector(state => state.task.updateTaskStatus);

  const handleUpdate = useCallback(
    async (data: CreateReminderSchema) => {
      if (!ediditingReminder) {
        return;
      }
      try {
        await dispatch(
          updateTask({
            id: ediditingReminder.id,
            daysOfWeek: data.daysOfWeek,
            kind: 'reminder',
            name: data.name,
            hours: 0,
            minutes: 0,
          }),
        ).unwrap();
        navigation.goBack();
        toastify(toastSuccessUpdateReminder);
      } catch (err) {
        const message = ErrorHandler.handle(err);
        toastify(toastErrorUpdateReminder(message));
      }
    },
    [dispatch, navigation, ediditingReminder, toastify],
  );

  /**
   * Update or create reminder
   */
  const isLoading = useMemo(
    () => createTaskStatus === 'pending' || updateTaskStatus === 'pending',
    [createTaskStatus, updateTaskStatus],
  );

  const onSubmit = useCallback<SubmitHandler<CreateReminderSchema>>(
    async data => {
      if (ediditingReminder) {
        await handleUpdate(data);
      } else {
        await handleCreate(data);
      }
    },
    [ediditingReminder, handleCreate, handleUpdate],
  );

  return {
    form,
    onSubmit,
    createTaskStatus,
    isLoading,
  };
};

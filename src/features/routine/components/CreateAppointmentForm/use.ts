import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';

import { CreateAppointmentFormProps } from '.';
import { useDispatch } from '../../../../shared/hooks/useDispatch';
import {
  CreateAppointmentSchema,
  createAppointmentSchema,
} from '../../schemas/createAppointmentSchema';
import {
  createAppointment,
  updateAppointment,
} from '../../stores/appointmentStore';

const buildDate = (date: Date, time: Date) => {
  const newDate = new Date(date);
  newDate.setHours(time.getHours());
  newDate.setMinutes(time.getMinutes());
  return newDate;
};

export const useCreateAppointmentForm = ({
  editingAppointment,
}: CreateAppointmentFormProps) => {
  /**
   * Redux setup
   */
  const dispatch = useDispatch();

  /**
   * Navigation setup
   */
  const navigation = useNavigation();

  /**
   * Form setup
   */
  const form = useForm<CreateAppointmentSchema>({
    resolver: zodResolver(createAppointmentSchema),
    defaultValues: editingAppointment
      ? {
          name: editingAppointment.name,
          date: new Date(editingAppointment.date),
          time: new Date(editingAppointment.date),
        }
      : {
          name: '',
          date: new Date(),
          time: new Date(),
        },
    mode: 'onSubmit',
  });

  /**
   * Create appointment
   */
  const handleCreate = useCallback(
    async (data: CreateAppointmentSchema) => {
      try {
        await dispatch(
          createAppointment({
            date: buildDate(data.date, data.time),
            name: data.name,
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
   * Update appointment
   */
  const handleUpdate = useCallback(
    async (data: CreateAppointmentSchema) => {
      if (!editingAppointment) {
        return;
      }
      try {
        await dispatch(
          updateAppointment({
            date: buildDate(data.date, data.time),
            name: data.name,
            id: editingAppointment.id,
            isCompleted: !!editingAppointment.isCompleted,
          }),
        ).unwrap();
        navigation.goBack();
      } catch {
        //
      }
    },
    [dispatch, editingAppointment, navigation],
  );

  /**
   * Update or create appointment
   */
  const onSubmit = useCallback<SubmitHandler<CreateAppointmentSchema>>(
    data => {
      if (editingAppointment) {
        handleUpdate(data);
      } else {
        handleCreate(data);
      }
    },
    [editingAppointment, handleCreate, handleUpdate],
  );

  return {
    form,
    onSubmit,
  };
};

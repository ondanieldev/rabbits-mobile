import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';

import { CreateAppointmentFormProps } from '.';
import { useDispatch } from '../../../../shared/hooks/useDispatch';
import { ErrorHandler } from '../../../error/services/ErrorHandler';
import { useToast } from '../../../toast/contexts/toastContext';
import {
  toastErrorCreateAppointment,
  toastErrorUpdateAppointment,
  toastSuccessCreateAppointment,
  toastSuccessUpdateAppointment,
} from '../../../toast/data/toastTemplates';
import {
  CreateAppointmentSchema,
  createAppointmentSchema,
} from '../../schemas/createAppointmentSchema';
import {
  createAppointment,
  updateAppointment,
} from '../../stores/appointmentStore';
import { getInitialValues, initialValues, transformData } from './data';

export const useCreateAppointmentForm = ({
  editingAppointment,
}: CreateAppointmentFormProps) => {
  /**
   * Toast setup
   */
  const { toastify } = useToast();

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
      ? getInitialValues(editingAppointment)
      : initialValues,
    mode: 'onSubmit',
  });

  /**
   * Create appointment
   */
  const handleCreate = useCallback(
    async (data: CreateAppointmentSchema) => {
      try {
        await dispatch(createAppointment(transformData(data))).unwrap();
        form.reset();
        toastify(toastSuccessCreateAppointment);
      } catch (err) {
        const message = ErrorHandler.handle(err);
        toastify(toastErrorCreateAppointment(message));
      }
    },
    [dispatch, form, toastify],
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
            id: editingAppointment.id,
            isCompleted: !!editingAppointment.isCompleted,
            ...transformData(data),
          }),
        ).unwrap();
        navigation.goBack();
        toastify(toastSuccessUpdateAppointment);
      } catch (err) {
        const message = ErrorHandler.handle(err);
        toastify(toastErrorUpdateAppointment(message));
      }
    },
    [dispatch, editingAppointment, navigation, toastify],
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

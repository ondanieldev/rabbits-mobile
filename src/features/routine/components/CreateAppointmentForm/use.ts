import { useCallback, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';

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

export const useCreateAppointmentForm = ({
  editingAppointment,
}: CreateAppointmentFormProps) => {
  /**
   * Translation
   */
  const { t } = useTranslation(['common', 'routine']);
  const nameLabel = useMemo(() => t('name', { ns: 'routine' }), [t]);
  const dateLabel = useMemo(() => t('date', { ns: 'routine' }), [t]);
  const timeLabel = useMemo(() => t('time', { ns: 'routine' }), [t]);
  const buttonText = useMemo(() => t('save', { ns: 'routine' }), [t]);

  /**
   * Formating
   */
  const formatDate = useCallback(
    (date: Date) =>
      `${format(date, 'dd')} ${t(format(date, 'LLLL'), {
        ns: 'common',
      })} ${format(date, 'yyyy')}`,
    [t],
  );
  const formatTime = useCallback((date: Date) => format(date, 'HH:mm'), []);

  /**
   * Redux
   */
  const dispatch = useDispatch();

  /**
   * Navigation
   */
  const navigation = useNavigation();

  /**
   * Form
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
      const date = new Date(data.date);
      date.setHours(data.time.getHours());
      date.setMinutes(data.time.getMinutes());
      try {
        await dispatch(
          createAppointment({
            date,
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
      const date = new Date(data.date);
      date.setHours(data.time.getHours());
      date.setMinutes(data.time.getMinutes());
      try {
        await dispatch(
          updateAppointment({
            date,
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
   * Submit
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
    nameLabel,
    dateLabel,
    timeLabel,
    buttonText,
    formatDate,
    formatTime,
    form,
    onSubmit,
  };
};

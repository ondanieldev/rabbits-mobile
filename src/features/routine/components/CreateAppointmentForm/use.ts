import { useCallback, useMemo } from 'react';
import { SubmitHandler, UseFormReturn, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';

import {
  CreateAppointmentSchema,
  createAppointmentSchema,
} from '../../schemas/createAppointmentSchema';

export type CreateAppointmentFormHook = () => {
  nameLabel: string;
  dateLabel: string;
  timeLabel: string;
  buttonText: string;
  formatDate: (date: Date) => string;
  formatTime: (date: Date) => string;
  form: UseFormReturn<CreateAppointmentSchema>;
  onSubmit: SubmitHandler<CreateAppointmentSchema>;
};

export const useCreateAppointmentForm: CreateAppointmentFormHook = () => {
  const { t } = useTranslation(['common', 'routine']);

  const nameLabel = useMemo(() => t('name', { ns: 'routine' }), [t]);

  const dateLabel = useMemo(() => t('date', { ns: 'routine' }), [t]);

  const timeLabel = useMemo(() => t('time', { ns: 'routine' }), [t]);

  const buttonText = useMemo(() => t('save', { ns: 'routine' }), [t]);

  const formatDate = useCallback(
    (date: Date) =>
      `${format(date, 'dd')} ${t(format(date, 'LLLL'), {
        ns: 'common',
      })} ${format(date, 'yyyy')}`,
    [t],
  );

  const formatTime = useCallback((date: Date) => format(date, 'HH:mm'), []);

  const form = useForm<CreateAppointmentSchema>({
    resolver: zodResolver(createAppointmentSchema),
    defaultValues: {
      name: '',
      date: new Date(),
      time: new Date(),
    },
    mode: 'onSubmit',
  });

  const onSubmit = useCallback<SubmitHandler<CreateAppointmentSchema>>(data => {
    console.log(data);
  }, []);

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

import { useCallback, useMemo } from 'react';
import { SubmitHandler, UseFormReturn, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';

import {
  CreateHabitSchema,
  createHabitSchema,
} from '../../schemas/createHabitSchema';

export type CreateHabitFormHook = () => {
  nameLabel: string;
  timeLabel: string;
  daysOfWeekLabel: string;
  buttonText: string;
  formatTime: (date: Date) => string;
  form: UseFormReturn<CreateHabitSchema>;
  onSubmit: SubmitHandler<CreateHabitSchema>;
};

export const useCreateHabitForm: CreateHabitFormHook = () => {
  const { t } = useTranslation('routine');

  const nameLabel = useMemo(() => t('name'), [t]);

  const timeLabel = useMemo(() => t('time'), [t]);

  const formatTime = useCallback((date: Date) => format(date, 'HH:mm'), []);

  const daysOfWeekLabel = useMemo(() => t('daysOfWeek'), [t]);

  const buttonText = useMemo(() => t('save'), [t]);

  const form = useForm<CreateHabitSchema>({
    resolver: zodResolver(createHabitSchema),
    defaultValues: {
      name: '',
      daysOfWeek: [],
      time: new Date(),
    },
    mode: 'onSubmit',
  });

  const onSubmit = useCallback<SubmitHandler<CreateHabitSchema>>(data => {
    console.log(data);
  }, []);

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

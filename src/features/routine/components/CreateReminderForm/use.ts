import { useCallback, useMemo } from 'react';
import { SubmitHandler, UseFormReturn, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  CreateReminderSchema,
  createReminderSchema,
} from '../../schemas/createReminderSchema';

export type CreateReminderFormHook = () => {
  nameLabel: string;
  daysOfWeekLabel: string;
  buttonText: string;
  form: UseFormReturn<CreateReminderSchema>;
  onSubmit: SubmitHandler<CreateReminderSchema>;
};

export const useCreateReminderForm: CreateReminderFormHook = () => {
  const { t } = useTranslation('routine');

  const nameLabel = useMemo(() => t('name'), [t]);

  const daysOfWeekLabel = useMemo(() => t('daysOfWeek'), [t]);

  const buttonText = useMemo(() => t('save'), [t]);

  const form = useForm<CreateReminderSchema>({
    resolver: zodResolver(createReminderSchema),
    defaultValues: {
      name: '',
      daysOfWeek: [],
    },
    mode: 'onSubmit',
  });

  const onSubmit = useCallback<SubmitHandler<CreateReminderSchema>>(data => {
    console.log(data);
  }, []);

  return {
    nameLabel,
    daysOfWeekLabel,
    buttonText,
    form,
    onSubmit,
  };
};

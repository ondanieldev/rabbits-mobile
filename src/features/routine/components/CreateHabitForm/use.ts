import { useCallback, useEffect } from 'react';
import { SubmitHandler, UseFormReturn, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  CreateHabitSchema,
  createHabitSchema,
} from '../../schemas/createHabitSchema';

export type CreateHabitFormHook = () => {
  form: UseFormReturn<CreateHabitSchema>;
  onSubmit: SubmitHandler<CreateHabitSchema>;
};

export const useCreateHabitForm: CreateHabitFormHook = () => {
  const form = useForm<CreateHabitSchema>({
    resolver: zodResolver(createHabitSchema),
    defaultValues: {
      name: '',
      daysOfWeek: [],
      time: new Date(),
    },
    mode: 'onSubmit',
  });

  const onSubmit = useCallback<SubmitHandler<CreateHabitSchema>>(() => {}, []);

  useEffect(() => {}, [form]);

  return {
    form,
    onSubmit,
  };
};

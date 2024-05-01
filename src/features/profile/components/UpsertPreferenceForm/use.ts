import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { useDispatch } from '../../../../shared/hooks/useDispatch';
import { ErrorHandler } from '../../../error/services/ErrorHandler';
import { useToast } from '../../../toast/contexts/toastContext';
import {
  toastErrorUpsertPreference,
  toastSuccessUpsertPreference,
} from '../../../toast/data/toastTemplates';
import { useProfile } from '../../contexts/profileContext';
import {
  UpsertPreferenceSchema,
  upsertPreferenceSchema,
} from '../../schemas/upsertPreferenceScema';
import { upsertPreference } from '../../stores/profileStore';

export const useUpsertPreferenceForm = () => {
  /**
   * Profile setup
   */
  const { profile } = useProfile();

  /**
   * Redux setup
   */
  const dispatch = useDispatch();

  /**
   * Toast setup
   */
  const { toastify } = useToast();

  /**
   * Form setup
   */
  const form = useForm<UpsertPreferenceSchema>({
    resolver: zodResolver(upsertPreferenceSchema),
    defaultValues: profile
      ? {
          isNotificationEnabled: profile.isNotificationEnabled,
          isSoundEnabled: profile.isSoundEnabled,
        }
      : {
          isNotificationEnabled: false,
          isSoundEnabled: false,
        },
    mode: 'onSubmit',
  });

  /**
   * Upsert preference
   */
  const onSubmit = useCallback<SubmitHandler<UpsertPreferenceSchema>>(
    async data => {
      try {
        if (!data.isNotificationEnabled) {
          data.isSoundEnabled = false;
        }
        const result = await dispatch(upsertPreference(data)).unwrap();
        form.setValue('isNotificationEnabled', result.isNotificationEnabled);
        form.setValue('isSoundEnabled', result.isSoundEnabled);
        toastify(toastSuccessUpsertPreference);
      } catch (err) {
        const message = ErrorHandler.handle(err);
        toastify(toastErrorUpsertPreference(message));
      }
    },
    [dispatch, toastify, form],
  );

  return {
    form,
    onSubmit,
  };
};

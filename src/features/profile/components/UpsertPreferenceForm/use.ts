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
          isVibrationEnabled: profile.isVibrationEnabled,
        }
      : {
          isNotificationEnabled: false,
          isSoundEnabled: false,
          isVibrationEnabled: false,
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
          data.isVibrationEnabled = false;
        }
        const result = await dispatch(upsertPreference(data)).unwrap();
        form.setValue('isNotificationEnabled', result.isNotificationEnabled);
        form.setValue('isSoundEnabled', result.isSoundEnabled);
        form.setValue('isVibrationEnabled', result.isVibrationEnabled);
        toastify(toastSuccessUpsertPreference);
      } catch (err) {
        const message = ErrorHandler.handle(err);
        toastify(toastErrorUpsertPreference(message));
      }
    },
    [dispatch, toastify, form],
  );

  /**
   * Watch main field to show/hide other fields
   */
  const isNotificationEnabled = form.watch('isNotificationEnabled');

  return {
    isNotificationEnabled,
    form,
    onSubmit,
  };
};

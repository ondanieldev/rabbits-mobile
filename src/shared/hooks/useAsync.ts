import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';

import { ErrorHandler } from '../utils/ErrorHandler';

export type AsyncHookFn<TOutput, TInput> = (input: TInput) => Promise<TOutput>;

export type AsyncHookOptions<TOutput> = {
  onSuccess?: (response: TOutput) => void;
  onFailure?: (error: string) => void;
  errorOptions?: {
    title?: string;
    showAlert?: boolean;
  };
};

export type AsyncHook<TOutput, TInput> = {
  isLoading: boolean;
  error: string | undefined;
  output: TOutput | null;
  fetch: (input: TInput) => Promise<TOutput | null>;
};

export function useAsync<TOutput, TInput>(
  fn: AsyncHookFn<TOutput, TInput>,
  { onFailure, onSuccess, errorOptions }: AsyncHookOptions<TOutput>,
): AsyncHook<TOutput, TInput> {
  const { t } = useTranslation('error');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [output, setOutput] = useState<TOutput | null>(null);

  const fetch = useCallback(
    async (input: any) => {
      let response = null;
      try {
        setIsLoading(true);
        response = await fn(input);
        setOutput(response);
        onSuccess?.(response);
      } catch (err) {
        const handledError = ErrorHandler.handle(err);
        setError(handledError);
        onFailure?.(handledError);
        if (errorOptions) {
          Alert.alert(t(errorOptions.title || 'error'), t(handledError));
        }
      } finally {
        setIsLoading(false);
      }
      return response;
    },
    [fn, onSuccess, onFailure, errorOptions, t],
  );

  return {
    isLoading,
    error,
    output,
    fetch,
  };
}

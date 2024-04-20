'use client';

import { Provider } from 'react-redux';

import { reduxStore } from './reduxStore';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={reduxStore}>{children}</Provider>;
}

import { useDispatch as reduxUseDispatch } from 'react-redux';

import { reduxStore } from '../stores/reduxStore';

export type ReduxStoreDispatch = typeof reduxStore.dispatch;

export const useDispatch: () => ReduxStoreDispatch = reduxUseDispatch;

import {
  TypedUseSelectorHook,
  useSelector as reduxUseSelector,
} from 'react-redux';

import { ReduxStoreRootState } from '../stores/reduxStore';

export const useSelector: TypedUseSelectorHook<ReduxStoreRootState> =
  reduxUseSelector;

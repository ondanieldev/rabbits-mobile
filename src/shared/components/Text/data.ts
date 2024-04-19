import { StyleProp, TextStyle } from 'react-native';

import { TextVariant } from '.';
import { textStyles } from './styles';

export const textVariantStyleMap: Record<TextVariant, StyleProp<TextStyle>> = {
  primary: textStyles.primary,
};

import { useMemo } from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from 'react-native';

import { textVariantStyleMap } from './data';

export const textVariants = 'primary' as const;

export type TextVariant = (typeof textVariants)[number];

export interface TextProps extends RNTextProps {
  children: string;
  variant?: TextVariant;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'primary',
  style: propStyle,
  ...props
}) => {
  const style = useMemo(
    () => StyleSheet.compose(textVariantStyleMap[variant], propStyle),
    [variant, propStyle],
  );

  return (
    <RNText style={style} {...props}>
      {children}
    </RNText>
  );
};

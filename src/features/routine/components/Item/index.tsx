import React, { useMemo } from 'react';
import { StyleProp, TouchableHighlight, View, ViewStyle } from 'react-native';

import { CircleCheckBox } from '../../../../shared/components/CircleCheckBox';
import { IconButton } from '../../../../shared/components/IconButton';
import { Overlay } from '../../../../shared/components/Overlay';
import { Text } from '../../../../shared/components/Text';
import { ItemData } from '../../interfaces/ItemData';
import { itemTextProps, itemTrashIconProps } from './data';
import { itemStyles } from './styles';
import { ItemHook, useItem } from './use';
import { ItemTranslationHook, useItemTranslation } from './useTranslation';

export interface ItemProps {
  data: ItemData;
  isEditing?: boolean;
  styles?: {
    touchable?: StyleProp<ViewStyle>;
  };
  onSelect?: (data: ItemData) => void;
  onDelete?: (data: ItemData) => void;
  onToggle?: (data: ItemData) => void;
  isDeleting?: boolean | ((data: ItemData) => boolean);
  isToggling?: boolean | ((data: ItemData) => boolean);
}

export const Item: React.FC<ItemProps> = props => {
  const translationHook = useItemTranslation(props);
  const hook = useItem(props);

  return (
    <TouchableHighlight
      disabled={!props.isEditing}
      onPress={() => props.onSelect?.(props.data)}
      style={hook.styles.touchable}>
      <View>
        {!props.isEditing && props.data.isCompleted && <Overlay />}

        <View style={itemStyles.contentContainer}>
          {!props.isEditing && <Checkbox props={props} />}

          {props.isEditing && <DeleteIcon props={props} />}

          <Texts hook={hook} props={props} translationHook={translationHook} />
        </View>
      </View>
    </TouchableHighlight>
  );
};

const Checkbox = ({ props }: { props: ItemProps }) => {
  const isLoading = useMemo(
    () =>
      typeof props.isToggling === 'boolean'
        ? props.isToggling
        : props.isToggling?.(props.data),
    [props],
  );

  return (
    <CircleCheckBox
      isChecked={props.data.isCompleted}
      onToggle={() => props.onToggle?.(props.data)}
      isLoading={isLoading}
    />
  );
};

const DeleteIcon = ({ props }: { props: ItemProps }) => {
  const disabled = useMemo(
    () =>
      typeof props.isDeleting === 'boolean'
        ? props.isDeleting
        : props.isDeleting?.(props.data),
    [props],
  );

  return (
    <IconButton
      buttonProps={{
        onPress: () => props.onDelete?.(props.data),
        disabled,
      }}
      iconProps={itemTrashIconProps}
    />
  );
};

const Texts = ({
  hook,
  props,
  translationHook,
}: {
  hook: ReturnType<ItemHook>;
  props: ItemProps;
  translationHook: ReturnType<ItemTranslationHook>;
}) => {
  return (
    <View style={itemStyles.textContainer}>
      <Text {...itemTextProps} style={hook.styles.name}>
        {props.data.name}
      </Text>

      <Text style={hook.styles.date}>{translationHook.dateText}</Text>
    </View>
  );
};

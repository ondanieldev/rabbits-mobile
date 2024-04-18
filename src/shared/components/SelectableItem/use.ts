import { useCallback, useEffect, useState } from 'react';

import { SelectableItemProps } from '.';

export type SelectableItemHook = (props: SelectableItemProps) => {
  isSelected: boolean;
  handleToggle: () => void;
};

export const useSelectableItem: SelectableItemHook = ({
  defaultSelected,
  onToggle,
}) => {
  const [isSelected, setIsSelected] = useState(defaultSelected || false);

  const handleToggle = useCallback(() => {
    setIsSelected(!isSelected);
    onToggle();
  }, [isSelected, onToggle]);

  useEffect(() => {
    setIsSelected(!!defaultSelected);
  }, [defaultSelected]);

  return {
    isSelected,
    handleToggle,
  };
};

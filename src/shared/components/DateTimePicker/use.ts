import { useState } from 'react';

export type DateTimePickerHook = () => {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useDateTimePicker: DateTimePickerHook = () => {
  const [show, setShow] = useState(false);

  return {
    show,
    setShow,
  };
};

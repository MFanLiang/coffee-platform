import { useState, useCallback } from 'react';

/** 自定义 useBoolean */
const useBoolean = (initialValue: boolean): [boolean, (nextValue?: boolean) => void] => {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(
    (nextValue?: boolean) => {
      if (typeof nextValue === 'boolean') setValue(nextValue);
      else setValue((currentValue) => !currentValue);
    },
    [setValue]
  );

  return [value, toggle];
};

export default useBoolean;

import { useState, useEffect, useCallback } from 'react';

/** 状态持久化钩子 */
const useStickyState = (defaultValue: any, key: string) => {
  const [value, setValue] = useState(() => {
    const stickyValue = window.sessionStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue
  });

  useEffect(() => {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  });

  return [value, setValue];
};

export default useStickyState;

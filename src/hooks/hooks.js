import { useEffect, useState } from 'react';

export function useDebounce(value, delay) {
  const [updatedValue, setUpdatedValue] = useState(value);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setUpdatedValue(value);
    }, delay);

    return () => {
      window.clearTimeout(id);
    };
  }, [value, delay]);

  return updatedValue;
}

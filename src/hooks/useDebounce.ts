import { useMemo } from 'react';
import { debounce } from '../utils';

const useDebounce = (cb: (...args: any[]) => any, delay: number = 1_000) => {
  return useMemo(() => {
    return debounce(cb, delay);
  }, []);
};

export default useDebounce;

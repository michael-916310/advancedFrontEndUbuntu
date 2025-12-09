import { MutableRefObject, useCallback, useRef } from 'react';

/**
 * Шаред слой можно задокументировать, остальные не стоит
 * @param callback
 * @param delay
 */

export function useDebounce(callback: (...args: any[]) => void, delay: number) {
  const timer = useRef() as MutableRefObject<any>;

  return useCallback((...args: any[]) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => callback(...args), delay);
  }, [callback, delay]);
}

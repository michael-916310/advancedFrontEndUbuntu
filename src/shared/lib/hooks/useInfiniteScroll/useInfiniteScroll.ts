import { MutableRefObject, useEffect } from 'react';

export interface useInfiniteScrollOptions {
    callback?: () => void;
    triggerRef: MutableRefObject<MathMLElement>;
    wrapperRef: MutableRefObject<MathMLElement>;
}

export function useInfiniteScroll({ callback, wrapperRef, triggerRef }: useInfiniteScrollOptions) {
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const wrapperElement = wrapperRef.current;
    const triggerElement = triggerRef.current;

    if (callback) {
      const options = {
        root: wrapperElement,
        rootMargin: '0px',
        threshold: 1.0,
      };

      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      }, options);
      observer.observe(triggerElement);
    }

    return () => {
      if (observer && triggerElement) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(triggerElement);
      }
    };
  }, [callback, triggerRef, wrapperRef]);
}

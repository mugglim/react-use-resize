import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { checkIsElementOverflowed } from './utils';
import { useDebounce } from './hooks';

import type { OnResize, Options, ElementSizeOverflow } from './types';

/**
 *
 * @description React Hook for checking element is resized
 * @param
 * - onResize: (Required) Callback function when element is resize.
 * - options: (Optional) Options for useResize hook
 */
const useResize = <T extends Element>(
  onResize: OnResize,
  options: Options = {
    box: 'border-box',
    enableOverflow: false,
    debounceDelay: 0,
  },
) => {
  const elementRef = useRef<T>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const [elementOverflow, setElementOverFlow] = useState<ElementSizeOverflow>({
    width: false,
    height: false,
  });

  const debouncedOnResize = useDebounce(onResize, options.debounceDelay);

  const checkOverflow = () => {
    const isOverflowCheckEnabled = options.enableOverflow && elementRef.current;
    if (!isOverflowCheckEnabled) return;

    setElementOverFlow({
      width: checkIsElementOverflowed(elementRef.current),
      height: checkIsElementOverflowed(elementRef.current, 'height'),
    });
  };

  const handleResizeCallback: ResizeObserverCallback = (entry, observer) => {
    checkOverflow();
    debouncedOnResize(entry, observer);
  };

  useLayoutEffect(() => {
    const resizeObserverTarget = elementRef.current;
    if (!resizeObserverTarget) return;

    resizeObserverRef.current = new ResizeObserver(handleResizeCallback);
    resizeObserverRef.current.observe(resizeObserverTarget, { box: options.box });
  }, []);

  useEffect(() => {
    return () => {
      if (!resizeObserverRef.current) return;

      resizeObserverRef.current.disconnect();
      resizeObserverRef.current = null;
    };
  }, []);

  return {
    elementRef,
    isWidthOverflowed: elementOverflow.width,
    isHeightOverflowed: elementOverflow.height,
  };
};

export default useResize;

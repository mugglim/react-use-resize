import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import type { UseResizeProps, ElementSizeOverflow } from './types';

const useResize = <T extends Element>({
  onResize,
  options = {
    box: 'border-box',
    enableOverflow: false,
  },
}: UseResizeProps) => {
  const elementRef = useRef<T>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const [elementOverflow, setElementOverFlow] = useState<ElementSizeOverflow>({
    width: false,
    height: false,
  });

  const checkElementIsOverflowed = () => {
    const isOverflowCheckEnabled = options.enableOverflow && elementRef.current;
    if (!isOverflowCheckEnabled) return;

    const { scrollWidth, scrollHeight, clientWidth, clientHeight } = elementRef.current;
    const isWidthOverflowed = scrollWidth > clientWidth;
    const isHeightOverflowed = scrollHeight > clientHeight;

    setElementOverFlow({
      width: isWidthOverflowed,
      height: isHeightOverflowed,
    });
  };

  const handleResizeCallback: ResizeObserverCallback = (entry, observer) => {
    checkElementIsOverflowed();
    onResize(entry, observer);
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

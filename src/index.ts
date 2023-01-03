import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import type { ElementSizeOverflow, UseResizeProps } from './types';

const useResize = <T extends Element>({
  onResize,
  box = 'border-box',
}: UseResizeProps) => {
  const elementRef = useRef<T>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const [elementOverflow, setElementOverFlow] = useState<ElementSizeOverflow>({
    width: false,
    height: false,
  });

  const handleResizeCallback: ResizeObserverCallback = (entry, observer) => {
    if (elementRef.current) {
      const { scrollWidth, scrollHeight, clientWidth, clientHeight } =
        elementRef.current;
      const isWidthOverflowed = scrollWidth > clientWidth;
      const isHeightOverflowed = scrollHeight > clientHeight;

      setElementOverFlow({
        width: isWidthOverflowed,
        height: isHeightOverflowed,
      });
    }

    onResize(entry, observer);
  };

  useLayoutEffect(() => {
    if (!elementRef || !elementRef.current) return;
    resizeObserverRef.current = new ResizeObserver(handleResizeCallback);
    resizeObserverRef.current.observe(elementRef.current, { box });
  }, []);

  useEffect(() => {
    return () => {
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
    };
  });

  return {
    elementRef,
    isWidthOverflowed: elementOverflow.width,
    isHeightOverflowed: elementOverflow.height,
  };
};

export default useResize;

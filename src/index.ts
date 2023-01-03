import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export type UseResizeProps = {
  onResize: ResizeObserverCallback;
  options?: {
    box?: ResizeObserverBoxOptions;
    enableOverflow?: boolean;
  };
};

export type ElementSizeOverflow = {
  width: boolean;
  height: boolean;
};

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
    if (options.enableOverflow && elementRef.current) {
      const { scrollWidth, scrollHeight, clientWidth, clientHeight } = elementRef.current;
      const isWidthOverflowed = scrollWidth > clientWidth;
      const isHeightOverflowed = scrollHeight > clientHeight;

      setElementOverFlow({
        width: isWidthOverflowed,
        height: isHeightOverflowed,
      });
    }
  };

  const handleResizeCallback: ResizeObserverCallback = (entry, observer) => {
    checkElementIsOverflowed();
    onResize(entry, observer);
  };

  useLayoutEffect(() => {
    if (!elementRef || !elementRef.current) return;
    resizeObserverRef.current = new ResizeObserver(handleResizeCallback);
    resizeObserverRef.current.observe(elementRef.current, { box: options.box });
  }, []);

  useEffect(() => {
    return () => {
      resizeObserverRef.current?.disconnect();
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

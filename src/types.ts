export type UseResizeProps = {
  onResize: ResizeObserverCallback;
  options?: {
    box?: ResizeObserverBoxOptions;
    enableOverflow?: boolean;
    debounceDelay?: number;
  };
};

export type ElementSizeOverflow = {
  width: boolean;
  height: boolean;
};

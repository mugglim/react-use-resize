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

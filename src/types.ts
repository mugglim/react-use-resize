export type OnResize = ResizeObserverCallback;

export type Options = {
  box?: ResizeObserverBoxOptions;
  enableOverflow?: boolean;
  debounceDelay?: number;
};

export type ElementSizeOverflow = {
  width: boolean;
  height: boolean;
};

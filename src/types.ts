/**
 * Callback function when element is resize.
 */
export type OnResize = ResizeObserverCallback;

/**
 * Options for useResize hook
 */
export type Options = {
  /**
   * Options Resize Observer API  BOx options
   */
  box?: ResizeObserverBoxOptions;
  /**
   * Option for elements is overflowed.
   */
  enableOverflow?: boolean;
  /**
   * Delay for onResize callback function
   */
  debounceDelay?: number;
};

export type ElementSizeOverflow = {
  /**
   * Boolean for checking width is overflowed
   */
  width: boolean;
  /**
   * Boolean for checking height is overflowed
   */
  height: boolean;
};

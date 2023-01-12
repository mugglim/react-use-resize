# react-use-resize

<img src="./assets/main.png">

## Getting started

```bash
npm i react-use-resize
# or
yarn add react-use-resize
```

## Examples

```tsx
function App() {
  const { elementRef } = useResize<HTMLHeadingElement>({
    onResize: () => {
      // ...
    },
  });

  return (
    <div>
      <h1 ref={elementRef}>Hello World</h1>
    </div>
  );
}
```

### With checking element is overflowed

```tsx
function App() {
  const { elementRef, isWidthOverflowed, isHeightOverflowed } = useResize<HTMLHeadingElement>({
    onResize: () => {
      // ...
    },
    options: {
      enableOverflow: true,
    },
  });

  return (
    <div>
      <h1 ref={elementRef}>Hello World</h1>
    </div>
  );
}
```

## API Guides

### Options

```typescript
type UseResizeProps = {
  /**
   * Callback function will be triggered after resize event
   */
  onResize: ResizeObserverCallback;

  /**
   * Custom options
   */
  options?: {
    /**
     * ResizeObserverBoxOptions ex) 'border-'box'
     */
    box?: ResizeObserverBoxOptions;
    /**
     * Enable checking element is overflowed
     */
    enableOverflow?: boolean;

    /**
     * Debounce onResize callback. (default delay is 0)
     */
    debounceDelay?: number;
  };
};
```

### Returns

```tsx
type Returns<T extends Element> = {
  /**
   * Element is observed by ResizeObserver instance
   */
  elementRef: React.RefObject<T>;.

  /**
   * The value is for checking width of element is overflowed
   */
  isWidthOverflowed: boolean;

  /**
   * The value is for checking height of element is overflowed
   */
  isHeightOverflowed: boolean;
};
```

## License

MIT

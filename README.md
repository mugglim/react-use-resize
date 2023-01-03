# react-use-resize

> **react-use-resize** is a custom hook for detecting element is resized.

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

- `To be updated...`

### License

MIT

export const checkIsElementOverflowed = (element: Element, type: 'width' | 'height' = 'width') => {
  const { scrollWidth, scrollHeight, clientWidth, clientHeight } = element;
  return type === 'width' ? scrollWidth > clientWidth : scrollHeight > clientHeight;
};

export const debounce = (cb: (...args: any[]) => any, delay = 1_000) => {
  let debounceTimer: number | null = null;

  return (...args: any[]) => {
    if (debounceTimer !== null) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(() => {
      cb.apply(null, args);
    }, delay);
  };
};

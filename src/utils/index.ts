export const checkIsElementOverflowed = (element: Element, type: 'width' | 'height' = 'width') => {
  const { scrollWidth, scrollHeight, clientWidth, clientHeight } = element;
  return type === 'width' ? scrollWidth > clientWidth : scrollHeight > clientHeight;
};

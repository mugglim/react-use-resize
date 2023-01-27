import { useState } from 'react';
import useResize from '../../../src';

import './App.css';

function App() {
  const [count, setCount] = useState(-1);

  const onResize = () => {
    setCount((prev) => prev + 1);
  };

  const { elementRef } = useResize<HTMLTextAreaElement>(onResize);

  return (
    <div className="App">
      <h1>Hello react-use-resize</h1>
      <textarea ref={elementRef}>Resize me!!</textarea>
      <span>resize count: {count}</span>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';

interface CounterProps {
  initialCount?: number;
}

export const Counter: React.FC<CounterProps> = ({ initialCount = 0 }) => {
  const [count, setCount] = useState<number>(initialCount);

  useEffect(() => {
    console.log('Component mounted');

    return () => {
      console.log('Component will unmount');
    };
  }, []);

  useEffect(() => {
    console.log('Count updated:', count);
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
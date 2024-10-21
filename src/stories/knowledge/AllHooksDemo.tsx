import React, { useState, useEffect, useContext, useReducer, useMemo, useCallback, createContext } from 'react';

// 创建一个Context
const ThemeContext = createContext('light');

// 创建一个reducer
const counterReducer = (state: { count: number }, action: { type: string }) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

// 自定义Hook
const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};

export const AllHooksDemo: React.FC = () => {
  // useState
  const [name, setName] = useState('');

  // useEffect
  useEffect(() => {
    document.title = `Name: ${name}`;
  }, [name]);

  // useContext
  const theme = useContext(ThemeContext);

  // useReducer
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  // useMemo
  const expensiveComputation = useMemo(() => {
    return state.count * 1000;
  }, [state.count]);

  // useCallback
  const handleClick = useCallback(() => {
    console.log(`Button clicked. Count: ${state.count}`);
  }, [state.count]);

  // 自定义Hook
  const windowWidth = useWindowWidth();

  return (
    <div style={{ padding: '20px', backgroundColor: theme === 'light' ? '#f0f0f0' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
      <h2>All Hooks Demo</h2>
      
      <div>
        <h3>useState & useEffect</h3>
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Enter your name"
        />
        <p>Name: {name}</p>
      </div>

      <div>
        <h3>useContext</h3>
        <p>Current theme: {theme}</p>
      </div>

      <div>
        <h3>useReducer</h3>
        <p>Count: {state.count}</p>
        <button onClick={() => dispatch({ type: 'increment' })}>+</button>
        <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      </div>

      <div>
        <h3>useMemo</h3>
        <p>Expensive Computation Result: {expensiveComputation}</p>
      </div>

      <div>
        <h3>useCallback</h3>
        <button onClick={handleClick}>Log Count</button>
      </div>

      <div>
        <h3>Custom Hook (useWindowWidth)</h3>
        <p>Window width: {windowWidth}px</p>
      </div>
    </div>
  );
};

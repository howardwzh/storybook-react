import React, { useState, useMemo, useCallback, lazy, Suspense } from 'react';

// Key 示例
const ListWithKeys = () => {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  
  const addItem = () => {
    setItems([...items, `Item ${items.length + 1}`]);
  };

  return (
    <div>
      <h3>Key 优化</h3>
      <p>
        使用 key 优化列表渲染。
        在 React 中，使用 key 可以帮助 React 识别哪些元素发生了变化，从而优化渲染过程。
        在实际应用中，最好使用唯一 ID 作为 key。
        使用 key 可以提高渲染性能，减少不必要的重新渲染。
      </p>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li> // 使用 index 作为 key（注意：在实际应用中，最好使用唯一 ID）
        ))}
      </ul>
      <button onClick={addItem}>添加项目</button>
    </div>
  );
};

// Memoization 示例
const ExpensiveComponent = React.memo(({ value }: { value: number }) => {
  console.log('ExpensiveComponent rendered');
  return <div>Expensive Calculation Result: {value * 2}</div>;
});

const MemoizationDemo = () => {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(10);

  const expensiveValue = useMemo(() => {
    console.log('Expensive calculation performed');
    return value * 2;
  }, [value]);

  return (
    <div>
      <h3>Memoization (React.memo 和 useMemo)</h3>
      <p>
        React.memo 和 useMemo 是 React 中用于优化性能的工具。
        React.memo 用于优化组件渲染，useMemo 用于优化计算结果的缓存。
        使用 memoization 可以减少不必要的渲染，提高应用的性能。
      </p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <ExpensiveComponent value={expensiveValue} />
      <button onClick={() => setValue(value + 1)}>Change Value</button>
    </div>
  );
};

// Code Splitting 示例
const LazyComponent = lazy(() => import('./LazyComponent'));

const CodeSplittingDemo = () => {
  const [showLazy, setShowLazy] = useState(false);

  return (
    <div>
      <h3>代码拆分 (React.lazy 和 Suspense)</h3>
      <p>
        React.lazy 和 Suspense 是 React 中用于代码拆分的工具。
        React.lazy 用于懒加载组件，Suspense 用于在组件加载时显示 fallback 内容。
        代码拆分可以提高应用的加载速度和性能。
      </p>
      <button onClick={() => setShowLazy(!showLazy)}>
        {showLazy ? 'Hide' : 'Show'} Lazy Component
      </button>
      {showLazy && (
        <Suspense fallback={<div>Loading...</div>}>
          <LazyComponent />
        </Suspense>
      )}
    </div>
  );
};

// useCallback 示例
const ChildComponent = React.memo(({ onClick }: { onClick: () => void }) => {
  console.log('ChildComponent rendered');
  return <button onClick={onClick}>Click me</button>;
});

const UseCallbackDemo = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []);

  return (
    <div>
      <h3>useCallback</h3>
      <p>
        useCallback 是 React 中用于优化性能的工具。
        useCallback 用于缓存回调函数，避免不必要的重新渲染。
        使用 useCallback 可以提高应用的性能。
      </p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <ChildComponent onClick={handleClick} />
    </div>
  );
};

const StoryPerformance = () => (
    <div>
      <h2>性能优化技巧</h2>
      <ListWithKeys />
      <MemoizationDemo />
      <CodeSplittingDemo />
      <UseCallbackDemo />
      <div>
        <h3>shouldComponentUpdate</h3>
        <p>
          这是类组件中的一个生命周期方法，用于判断组件是否需要重新渲染。
          在函数组件中，可以使用 React.memo 实现类似的效果。
          使用 shouldComponentUpdate 可以提高渲染性能，减少不必要的重新渲染。
        </p>
      </div>
    </div>
  );
export default StoryPerformance;
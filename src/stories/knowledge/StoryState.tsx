import React, { useState, createContext, useContext } from 'react';

// 创建一个 Context
const ThemeContext = createContext('light');

// 组件内部状态示例
const InternalStateComponent = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h3>组件内部状态</h3>
      <p>计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
};

// Props 示例
const ChildComponent = ({ message }: { message: string }) => (
  <div>
    <h3>Props</h3>
    <p>来自父组件的消息: {message}</p>
  </div>
);

// Context API 示例
const ThemedComponent = () => {
  const theme = useContext(ThemeContext);
  return (
    <div>
      <h3>Context API</h3>
      <p>当前主题: {theme}</p>
    </div>
  );
};

const StoryState = () => (
    <div>
      <h2>状态管理 (State Management)</h2>
      
      <InternalStateComponent />
      
      <ChildComponent message="这是通过 props 传递的消息" />
      
      <ThemeContext.Provider value="dark">
        <ThemedComponent />
      </ThemeContext.Provider>
      
      <div>
        <h3>外部状态管理工具</h3>
        <p>Redux、MobX、Recoil 等用于处理更复杂的应用状态。</p>
        <p>这些工具通常用于大型应用，需要单独设置和配置。</p>
      </div>
    </div>
  );
  
export default StoryState;
import React from 'react';
import { AllHooksDemo } from './AllHooksDemo';

const StoryHooks = () => {
  return (
    <div>
      <h5>Hooks</h5>
      <p>Hooks 是 React 16.8 引入的新特性，允许你在函数组件中使用状态和其他 React 特性。</p>
      <p>Hooks 可以用于解决特定问题：</p>
      <ul>
        <li>useState 用于本地组件状态</li>
        <li>useEffect 用于副作用</li>
        <li>useContext 用于访问共享数据</li>
        <li>useReducer 用于复杂状态逻辑</li>
        <li>useMemo 用于性能优化</li>
        <li>useCallback 用于性能优化</li>
        <li>Custom Hooks 用于提取组件逻辑</li>
      </ul>
      <AllHooksDemo />
    </div>
  );
};

export default StoryHooks;

// const meta: Meta<typeof AllHooksDemo> = {
//   title: '知识点/3.Hooks',
//   component: AllHooksDemo,
//   parameters: {
//     layout: 'centered',
//   },
//   argTypes: {
//     description: {
//       description: `

//       `,
//     },
//   },
// };



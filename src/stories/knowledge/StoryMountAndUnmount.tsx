import React from 'react';
import { Counter } from './Counter';
const StoryMountAndUnmount = () => {
  const [show, setShow] = React.useState(true);
  return (
    <div>
      <p>点击按钮，可以加载和卸载组件</p>
      <button onClick={() => setShow(!show)}>Toggle</button>
      <p>当前状态：<span>{show ? '已加载' : '已卸载'}</span></p>
      <div className='h-[100px]'>{show && <Counter />}</div>
    </div>
  );
}
export default StoryMountAndUnmount;

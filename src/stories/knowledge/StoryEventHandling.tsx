import React, { useState } from 'react';

// 函数组件中的事件处理
const FunctionalEventHandling = () => {
  const [message, setMessage] = useState('');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMessage('按钮被点击了！');
    console.log('事件对象:', event);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(`输入的值: ${event.target.value}`);
  };

  return (
    <div>
      <h3>函数组件中的事件处理</h3>
      <button onClick={handleClick}>点击我</button>
      <input type="text" onChange={handleChange} placeholder="输入些什么..." />
      <p>{message}</p>
    </div>
  );
};

// 类组件中的事件处理
class ClassEventHandling extends React.Component {
  state = {
    message: ''
  };

  handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ message: '按钮被点击了！' });
    console.log('事件对象:', event);
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ message: `输入的值: ${event.target.value}` });
  };

  render() {
    return (
      <div>
        <h3>类组件中的事件处理</h3>
        <button onClick={this.handleClick}>点击我</button>
        <input type="text" onChange={this.handleChange} placeholder="输入些什么..." />
        <p>{this.state.message}</p>
      </div>
    );
  }
}

// 合成事件示例
const SyntheticEventDemo = () => {
  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log('鼠标进入:', event.clientX, event.clientY);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log('鼠标离开:', event.clientX, event.clientY);
  };

  return (
    <div>
      <h3>合成事件示例</h3>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ width: '200px', height: '100px', backgroundColor: 'lightblue' }}
      >
        鼠标移入移出这个区域
      </div>
      <p>查看控制台以了解事件细节</p>
    </div>
  );
};

const StoryEventHandling = () => (
    <div>
      <h2>React 事件处理</h2>
      <p>
        React 使用合成事件系统（Synthetic Events），确保跨浏览器兼容性。
        事件绑定的方式与标准 HTML 不同，需要使用驼峰命名法，并传递一个函数作为事件处理器。
      </p>
      <FunctionalEventHandling />
      <ClassEventHandling />
      <SyntheticEventDemo />
    </div>
  );
export default StoryEventHandling;
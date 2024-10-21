import React, { useState, useRef } from 'react';

// 受控组件示例
const ControlledComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [selectValue, setSelectValue] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(`提交的数据：\n输入框：${inputValue}\n文本域：${textareaValue}\n选择框：${selectValue}`);
  };

  return (
    <div>
      <h3>受控组件</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="controlled-input">输入框：</label>
          <input
            id="controlled-input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="controlled-textarea">文本域：</label>
          <textarea
            id="controlled-textarea"
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="controlled-select">选择框：</label>
          <select
            id="controlled-select"
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
          >
            <option value="">请选择</option>
            <option value="option1">选项1</option>
            <option value="option2">选项2</option>
            <option value="option3">选项3</option>
          </select>
        </div>
        <button type="submit">提交</button>
      </form>
    </div>
  );
};

// 非受控组件示例
const UncontrolledComponent = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputValue = inputRef.current?.value;
    const textareaValue = textareaRef.current?.value;
    const selectValue = selectRef.current?.value;
    alert(`提交的数据：\n输入框：${inputValue}\n文本域：${textareaValue}\n选择框：${selectValue}`);
  };

  return (
    <div>
      <h3>非受控组件</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="uncontrolled-input">输入框：</label>
          <input
            id="uncontrolled-input"
            type="text"
            ref={inputRef}
            defaultValue=""
          />
        </div>
        <div>
          <label htmlFor="uncontrolled-textarea">文本域：</label>
          <textarea
            id="uncontrolled-textarea"
            ref={textareaRef}
            defaultValue=""
          />
        </div>
        <div>
          <label htmlFor="uncontrolled-select">选择框：</label>
          <select
            id="uncontrolled-select"
            ref={selectRef}
            defaultValue=""
          >
            <option value="">请选择</option>
            <option value="option1">选项1</option>
            <option value="option2">选项2</option>
            <option value="option3">选项3</option>
          </select>
        </div>
        <button type="submit">提交</button>
      </form>
    </div>
  );
};

const StoryForm = () => (
    <div>
      <h2>React 表单处理</h2>
      <p>
        React 提供了两种处理表单输入的方式：受控组件和非受控组件。
        受控组件通过 React 状态控制表单元素的值，而非受控组件则直接通过 DOM 操作。
      </p>
      <ControlledComponent />
      <UncontrolledComponent />
    </div>
  );
export default StoryForm;
import React, { useState, useRef, useEffect } from 'react';

const StoryVirtualDOM = () => {
  const [count, setCount] = useState(0);
  const [list, setList] = useState(['Item 1', 'Item 2', 'Item 3']);
  const listRef = useRef<HTMLUListElement>(null);

  // useEffect(() => {
  //   if (listRef.current) {
  //     const listItems = listRef.current.children;
  //     for (let i = 0; i < listItems.length; i++) {
  //       listItems[i].classList.add('updated');
  //       setTimeout(() => {
  //         listItems[i].classList.remove('updated');
  //       }, 1000);
  //     }
  //   }
  // }, [list]);

  const addItem = () => {
    setList([...list, `Item ${list.length + 1}`]);
  };

  return (
    <div>
      <h2>虚拟 DOM 演示</h2>
      <p>
        虚拟 DOM 允许 React 在内存中计算变更，然后高效地更新实际 DOM。
        下面的例子展示了 React 如何只更新必要的部分。
      </p>
      <div>
        <p>计数器: {count}</p>
        <button onClick={() => setCount(count + 1)}>增加计数</button>
      </div>
      <div>
        <ul ref={listRef}>
          {list.map((item, index) => (
            <li key={index} className='updated'>{item}</li>
          ))}
        </ul>
        <button onClick={addItem}>添加项目</button>
      </div>
      <p>
        注意：当你点击"增加计数"时，只有计数器会更新。
        当你点击"添加项目"时，只有新的项目会被添加，现有项目不会重新渲染。
        这展示了 React 的高效更新机制。
      </p>
      <style>{`
        .updated {
          animation: fadeIn 1s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
            background-color: yellow;
          }
        }
      `}</style>
    </div>
  );
};

export default StoryVirtualDOM;

import React from 'react';
import { Counter } from './Counter';
const Story = () => (
  <div>
    <h5>JSX (JavaScript XML)</h5>
    <p>JSX 是 JavaScript 的语法扩展，允许在 JavaScript 代码中写类似 HTML 的代码。</p>
    <p>JSX 通过 Babel 转译成 React.createElement()，从而在浏览器中运行。</p>
    <pre className='bg-gray-100 p-4 rounded-md'>
      <code>
        {`const element = <h1>Hello, world!</h1>;
ReactDOM.render(element, document.getElementById('root'));`}
      </code>
    </pre>
    <Counter />
  </div>
)
export default Story;
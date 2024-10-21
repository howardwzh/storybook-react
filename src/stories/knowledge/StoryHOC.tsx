import React from 'react';
import { UserProfile, withLoading } from './HOCComponent';

const StoryHOC = () => {
  const CustomLoadingComponent = withLoading(UserProfile, 3000);
  return (
    <div>
      <h5>高阶组件 (HOC)</h5>
      <p>高阶组件（HOC）是 React 中的一种设计模式，允许你通过组合现有组件来创建新组件。</p>
      <p>HOC 是一种函数，它接受一个组件作为参数，并返回一个新的组件。</p>
      <p>HOC 可以用于添加额外的 props、state、或行为到组件中。</p>
      <div className="bg-gray-100 p-4 rounded-md">
      <CustomLoadingComponent {...{
        name: 'Bob Johnson',
        email: 'bob@example.com',
      }} />
      </div>
    </div>
  );
};
export default StoryHOC;

// HOC 说明
// WithLoadingHOC.parameters = {
//   docs: {
//     description: {
//       story: `
// This story demonstrates the use of a Higher-Order Component (HOC) called \`withLoading\`.

// A Higher-Order Component is a function that takes a component as an argument and returns a new component. In this case, \`withLoading\` adds a loading state to any component it wraps.

// Key points about HOCs:
// 1. They allow logic reuse across multiple components.
// 2. They don't modify the input component, but rather compose a new component.
// 3. HOCs can add additional props, state, or behavior to components.

// In this example, \`withLoading\` adds a loading state that displays "Loading..." for a set duration before rendering the wrapped component. This pattern is useful for simulating API calls or other asynchronous operations.

// The \`WithLoadingHOC\` story shows the UserProfile component wrapped with the \`withLoading\` HOC, demonstrating how it adds loading behavior to the original component.

// The \`WithCustomLoadingTime\` story shows how the HOC can be customized (in this case, with a longer loading time), showcasing the flexibility of this pattern.
//       `,
//     },
//   },
// };
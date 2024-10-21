import React from 'react';

// 模拟的服务器端渲染组件
const ServerRenderedComponent = ({ initialData }: { initialData: string }) => (
  <div>
    <h3>服务器端渲染的组件</h3>
    <p>初始数据（来自服务器）: {initialData}</p>
  </div>
);

// 模拟的客户端渲染组件
const ClientRenderedComponent = () => {
  const [data, setData] = React.useState('加载中...');

  React.useEffect(() => {
    // 模拟API调用
    setTimeout(() => {
      setData('这是客户端获取的数据');
    }, 1000);
  }, []);

  return (
    <div>
      <h3>客户端渲染的组件</h3>
      <p>数据: {data}</p>
    </div>
  );
};

// 模拟的同构应用组件
const IsomorphicComponent = ({ initialData }: { initialData: string }) => {
  const [data, setData] = React.useState(initialData);

  React.useEffect(() => {
    // 模拟客户端水合（hydration）
    console.log('客户端水合完成');
    // 可以在这里添加客户端特定的逻辑
  }, []);

  return (
    <div>
      <h3>同构应用组件</h3>
      <p>数据: {data}</p>
      <button onClick={() => setData('更新后的数据')}>更新数据</button>
    </div>
  );
};

const StorySSR = () => (
    <div>
      <h2>服务器端渲染 (SSR) 和同构应用</h2>
      <p>
        服务器端渲染 (SSR) 是一种在服务器上生成 HTML 的技术，可以提高首次加载性能和搜索引擎优化 (SEO)。
        同构应用则是既可以在服务器端渲染，又可以在客户端渲染的应用。
      </p>
      
      <ServerRenderedComponent initialData="这是服务器生成的初始数据" />
      
      <ClientRenderedComponent />
      
      <IsomorphicComponent initialData="这是服务器生成的初始数据，但可以在客户端更新" />
      
      <div>
        <h3>SSR 和同构应用的优势</h3>
        <ul>
          <li>更好的首次加载性能：用户可以更快地看到内容</li>
          <li>改善 SEO：搜索引擎可以更容易地爬取和索引内容</li>
          <li>更好的用户体验：特别是在低性能设备或慢网络环境下</li>
          <li>同构应用结合了 SSR 和客户端渲染的优点</li>
        </ul>
      </div>
      
      <div>
        <h3>实现 SSR 的常用框架</h3>
        <ul>
          <li>Next.js：React 的 SSR 框架</li>
        </ul>
      </div>
      
      <div>
        <h3>注意事项</h3>
        <p>
          实际的 SSR 实现需要服务器环境。这个演示只是概念性的展示，
          无法完全模拟真实的 SSR 过程。在实际应用中，SSR 涉及到服务器端代码执行、
          数据预取、状态序列化等复杂过程。
        </p>
      </div>
    </div>
  );
export default StorySSR;
import React from 'react';

// 基础卡片组件
const Card = ({ children }: { children: React.ReactNode }) => (
  <div style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '16px', margin: '8px' }}>
    {children}
  </div>
);

// 特殊卡片组件（使用组合）
const SpecialCard = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <Card>
    <h3>{title}</h3>
    {children}
  </Card>
);

// 容器组件
const UserCardContainer = ({ userId }: { userId: number }) => {
  // 模拟从API获取用户数据
  const user = { id: userId, name: '张三', email: 'zhangsan@example.com' };

  return (
    <UserCardPresentation user={user} />
  );
};

// 展示组件
const UserCardPresentation = ({ user }: { user: { id: number, name: string, email: string } }) => (
  <Card>
    <h3>{user.name}</h3>
    <p>ID: {user.id}</p>
    <p>Email: {user.email}</p>
  </Card>
);

// 使用组合的例子
const CompositionExample = () => (
  <div>
    <h3>组合示例</h3>
    <Card>
      <p>这是一个基础卡片</p>
    </Card>
    <SpecialCard title="特殊卡片">
      <p>这是一个使用组合创建的特殊卡片</p>
    </SpecialCard>
    <UserCardContainer userId={1} />
  </div>
);

// 继承的例子（不推荐在React中使用）
class BaseComponent extends React.Component<{ message: string }> {
  render() {
    return <div>{this.props.message}</div>;
  }
}

class InheritedComponent extends BaseComponent {
  render() {
    return (
      <div>
        <h4>继承的组件：</h4>
        {super.render()}
      </div>
    );
  }
}

const InheritanceExample = () => (
  <div>
    <h3>继承示例（不推荐）</h3>
    <InheritedComponent message="这是通过继承创建的组件" />
  </div>
);

const StoryComposition = () => (
    <div>
      <h2>组合 vs 继承</h2>
      <p>
        React 推荐使用组合而不是继承来实现代码复用。
        组合允许更灵活的设计，并且可以通过 props 和 children 来定制组件行为。
      </p>
      <CompositionExample />
      <InheritanceExample />
      <div>
        <h3>组合的优势</h3>
        <ul>
          <li>更灵活：可以通过 props 和 children 轻松定制组件</li>
          <li>更易于理解：组件之间的关系更加明确</li>
          <li>更好的封装：组件的内部实现对外部是隐藏的</li>
          <li>更易于测试：可以独立测试每个组件</li>
        </ul>
      </div>
    </div>
  );
export default StoryComposition;
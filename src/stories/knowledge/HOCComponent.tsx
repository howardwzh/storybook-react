import React, { ComponentType, useState, useEffect } from 'react';

// 定义 HOC
export function withLoading<P extends object>(
  WrappedComponent: ComponentType<P>,
  loadingTime: number = 1500
) {
  return function WithLoading(props: P) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, loadingTime);

      return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
}

// 创建一个简单的组件来使用 HOC
interface UserProfileProps {
  name: string;
  email: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({ name, email }) => (
  <div>
    <h2>User Profile</h2>
    <p>Name: {name}</p>
    <p>Email: {email}</p>
  </div>
);

// 使用 HOC 创建一个新的组件
export const UserProfileWithLoading = withLoading(UserProfile);
import React, { useEffect } from 'react';

export const ComponentDemo: React.FC = () => {
  useEffect(() => {
    console.log('Component mounted');

    return () => {
      console.log('Component will unmount');
    };
  }, []);

  return (
    <div className='bg-green-500 text-center text-white'>
      <p>I am a Component</p>
    </div>
  );
}
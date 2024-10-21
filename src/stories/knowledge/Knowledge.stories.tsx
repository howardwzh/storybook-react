import React from 'react';
import { Meta } from '@storybook/react';
import StoryJSX from './StoryJSX';
import StoryMountAndUnmount from './StoryMountAndUnmount';
import StoryHOC from './StoryHOC';
import StoryHooks from './StoryHooks';
import StoryState from './StoryState';
import StoryVirtualDOM from './StoryVirtualDOM';
import StoryPerformance from './StoryPerformance';
import StoryEventHandling from './StoryEventHandling';
import StoryForm from './StoryForm';
import StoryComposition from './StoryComposition';
import StorySSR from './StorySSR';

const meta: Meta = {
  title: '知识点new',
  // tags: ['autodocs'],
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const JSX = {
  args: {},
  render: () => <StoryJSX />,
  name: 'JSX知识',
};

export const MountAndUnmount = {
  args: {},
  render: () => <StoryMountAndUnmount />,
  name: '生命周期',
};

export const HOC = {
  args: {},
  render: () => <StoryHOC />,
  name: '高阶组件',
};

export const Hooks = {
  args: {},
  render: () => <StoryHooks />,
  name: 'React Hooks',
};

export const State = {
  args: {},
  render: () => <StoryState />,
  name: '状态管理',
};

export const VirtualDOM = {
  args: {},
  render: () => <StoryVirtualDOM />,
  name: '虚拟DOM',
};

export const Performance = {
  args: {},
  render: () => <StoryPerformance />,
  name: '性能优化',
};

export const EventHandling = {
  args: {},
  render: () => <StoryEventHandling />,
  name: '事件处理',
};

export const Form = {
  args: {},
  render: () => <StoryForm />,
  name: '表单处理',
};

export const Composition = {
  args: {},
  render: () => <StoryComposition />,
  name: '组合 vs 继承',
};

export const SSR = {
  args: {},
  render: () => <StorySSR />,
  name: 'SSR和同构应用',
};
import type { Meta, StoryObj } from '@storybook/react';
import PostInputBox from './PostInputBox';

const meta: Meta<typeof PostInputBox> = {
  title: 'Components/PostInputBox',
  component: PostInputBox,
};

export default meta;
type Story = StoryObj<typeof PostInputBox>;

export const FullFeaturedExample: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div>
        <p>This example showcases all features:</p>
        <ul>
          <li>Rich text formatting (header, bold, underline, list)</li>
          <li>Auto-detection of links, mentions, and hashtags</li>
          <li>Emoji support with Twemoji style</li>
          <li>Autocomplete for mentions and hashtags</li>
        </ul>
        <p>Try the following:</p>
        <ol>
          <li>Type a link: https://example.com</li>
          <li>Use @username or #topic</li>
          <li>Insert emojis: 😊🚀</li>
          <li>Start typing @ or # for autocomplete suggestions</li>
        </ol>
        <Story />
      </div>
    ),
  ],
};

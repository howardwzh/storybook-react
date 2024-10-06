import type { Meta, StoryObj } from '@storybook/react';
import PostInputBox from '../components/PostInputBox';

const meta: Meta<typeof PostInputBox> = {
  title: 'Components/PostInputBox',
  component: PostInputBox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PostInputBox>;

export const Default: Story = {
  args: {},
};

export const WithInitialContent: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div>
        <p>Try typing a link (e.g., https://example.com), a mention (@username), or a hashtag (#topic):</p>
        <Story />
      </div>
    ),
  ],
};

export const WithEmoji: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div>
        <p>Try typing an emoji (e.g., 😊 or 🚀):</p>
        <Story />
      </div>
    ),
  ],
};

export const WithAutocomplete: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div>
        <p>Try typing @ to see user suggestions (e.g., @John, @Mary):</p>
        <p>Try typing # to see hashtag suggestions (e.g., #react, #javascript):</p>
        <Story />
      </div>
    ),
  ],
};

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
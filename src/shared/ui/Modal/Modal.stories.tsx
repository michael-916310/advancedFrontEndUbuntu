import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Modal } from './Modal';
import { Theme } from '@/shared/const/theme';

const meta = {
  title: 'shared/Modal',
  component: Modal,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    isOpen: true,
    children: (
      <span>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem eaque
        error excepturi illum nobis saepe sint voluptatum. Deleniti esse nobis
        sunt voluptas? Dolorum impedit neque pariatur perferendis quaerat, quasi
        quidem?
      </span>
    ),
  },
};

export const Dark: Story = {
  args: {
    isOpen: true,
    children: (
      <span>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet animi at
        atque delectus, error expedita harum illum modi, molestiae molestias
        mollitia nostrum, optio porro? Accusantium adipisci expedita quibusdam
        vero voluptatum?
      </span>
    ),
  },
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

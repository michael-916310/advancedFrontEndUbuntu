import type { Meta, StoryObj } from '@storybook/react';
import { Code } from './Code';

const meta = {
  title: 'shared/Code',
  component: Code,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof Code>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: 'const meta = {\n'
      + '  title: \'shared/Code\',\n'
      + '  component: Code,\n'
      + '  parameters: {\n'
      + '    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout\n'
      + '    layout: \'centered\',\n'
      + '  },\n'
      + '} satisfies Meta<typeof Code>;\n'
      + '\n'
      + 'export default meta;\n'
      + '\n'
      + 'type Story = StoryObj<typeof meta>;',
  },
};

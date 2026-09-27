/** @jsxImportSource @emotion/react */
import type { Meta, StoryObj } from '@storybook/react-vite';
import withBalanceLayout from '../src/with-css/withBalanceLayout';
import createContainerDecorator from './_internal/createContainerDecorator';
import createResizableContainer from './_internal/createResizableContainer';
import Box from './Box';
import { ARGS, ARG_TYPES } from './constants';

const ResizableContainer = createResizableContainer(withBalanceLayout(Box));
const meta = {
  title: 'withBalanceLayout',
  component: ResizableContainer,
  tags: ['layout'],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  decorators: createContainerDecorator() as any,
} satisfies Meta<typeof ResizableContainer>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: ARG_TYPES.balance,
  args: {
    ...ARGS.balance,
    itemCount: 5,
  },
};

/** @jsxImportSource @emotion/react */
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { WithLayoutProps } from '../src/withLayout';
import withLayout from '../src/withLayout';
import createContainerDecorator from './_internal/createContainerDecorator';
import createResizableContainer from './_internal/createResizableContainer';
import type { BoxProps } from './Box';
import Box from './Box';
import { ARGS, ARG_TYPES } from './constants';

const ResizableContainer = createResizableContainer(
  withLayout<BoxProps & WithLayoutProps, HTMLDivElement>(Box),
);
const meta = {
  title: 'withLayout',
  component: ResizableContainer,
  tags: ['layout'],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  decorators: createContainerDecorator() as any,
} satisfies Meta<typeof ResizableContainer>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Balance: Story = {
  argTypes: ARG_TYPES.balance,
  args: {
    ...ARGS.balance,
    layout: 'balance',
    itemCount: 12,
  },
};

export const Flow: Story = {
  argTypes: ARG_TYPES.flow,
  args: {
    ...ARGS.flow,
    layout: 'flow',
    itemCount: 12,
  },
};

export const Pack: Story = {
  argTypes: ARG_TYPES.pack,
  args: {
    ...ARGS.pack,
    layout: 'pack',
    sizeType: 'none',
    itemCount: 12,
  },
};

export const Matrix: Story = {
  argTypes: ARG_TYPES.matrix,
  args: {
    ...ARGS.matrix,
    layout: 'matrix',
    itemCount: 12,
  },
};

export const Pin: Story = {
  argTypes: ARG_TYPES.pin,
  args: {
    ...ARGS.pin,
    layout: 'pin',
    itemCount: 12,
  },
};

export const Stack: Story = {
  argTypes: ARG_TYPES.stack,
  args: {
    ...ARGS.stack,
    layout: 'stack',
    itemCount: 12,
  },
};

export const Tile: Story = {
  argTypes: ARG_TYPES.tile,
  args: {
    ...ARGS.tile,
    layout: 'tile',
    itemCount: 12,
  },
};

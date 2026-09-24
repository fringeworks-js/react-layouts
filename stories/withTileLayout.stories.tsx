/** @jsxImportSource @emotion/react */
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { WithTileLayoutProps } from '../src/withTileLayout';
import withTileLayout from '../src/withTileLayout';
import createContainerDecorator from './_internal/createContainerDecorator';
import createResizableContainer from './_internal/createResizableContainer';
import type { BoxProps } from './Box';
import Box from './Box';
import { ARGS, ARG_TYPES } from './constants';

const ResizableContainer = createResizableContainer(
  withTileLayout<BoxProps & WithTileLayoutProps, HTMLDivElement>(Box),
);
const meta = {
  title: 'withTileLayout',
  component: ResizableContainer,
  tags: ['layout'],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  decorators: createContainerDecorator() as any,
} satisfies Meta<typeof ResizableContainer>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: ARG_TYPES.tile,
  args: {
    ...ARGS.tile,
    itemCount: 12,
  },
};

/** @jsxImportSource @emotion/react */
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { WithMatrixLayoutProps } from '../src/withMatrixLayout';
import withMatrixLayout from '../src/with-css/withMatrixLayout';
import createContainerDecorator from './_internal/createContainerDecorator';
import createResizableContainer from './_internal/createResizableContainer';
import type { BoxProps } from './Box';
import Box from './Box';
import { ARGS, ARG_TYPES } from './constants';

const ResizableContainer = createResizableContainer(
  withMatrixLayout<BoxProps & WithMatrixLayoutProps, HTMLDivElement>(Box),
);
const meta = {
  title: 'withMatrixLayout',
  component: ResizableContainer,
  tags: ['layout'],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  decorators: createContainerDecorator() as any,
} satisfies Meta<typeof ResizableContainer>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: ARG_TYPES.matrix,
  args: {
    ...ARGS.matrix,
    itemCount: 12,
  },
};

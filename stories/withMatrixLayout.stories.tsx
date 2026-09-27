/** @jsxImportSource @emotion/react */
import { unsafeCast } from '@niche-works/utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentType } from 'react';
import withMatrixLayout from '../src/with-css/withMatrixLayout';
import createContainerDecorator from './_internal/createContainerDecorator';
import createResizableContainer from './_internal/createResizableContainer';
import Box from './Box';
import { ARGS, ARG_TYPES } from './constants';

const ResizableContainer = createResizableContainer(
  unsafeCast<ComponentType>(withMatrixLayout(Box)),
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
    itemCount: 5,
  },
};

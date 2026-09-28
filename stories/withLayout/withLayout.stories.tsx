import type { ArgTypes, Meta, StoryObj } from '@storybook/react-vite';
import type { LayoutType } from '../../src/constants';
import { LayoutType as LayoutTypes } from '../../src/constants';
import withLayout from '../../src/with-css/withLayout';
import LayoutContainer from '../_internal/LayoutContainer';
import { ARG_TYPES, ARGS } from '../_shared/constants';
import createContainerModel from '../_shared/createContainerModel';
import type { LayoutName, StoryArgs } from '../_shared/types';

/**
 * `layout`プロパティでレイアウトを切り替える動的版
 *
 * 各レイアウトの検証はlayoutごとのstoryで行うため、ここでは表示確認のみを行う
 */
type LayoutArgs = StoryArgs & { layout: LayoutType };

const LayoutDiv = withLayout('div');

const LAYOUT_ARG_TYPES: ArgTypes<LayoutArgs> = {
  layout: {
    control: 'select',
    options: Object.values(LayoutTypes),
  },
};

const meta = {
  title: 'withLayout',
  render: (args) => (
    <LayoutContainer component={LayoutDiv} model={createContainerModel(args)} />
  ),
} satisfies Meta<LayoutArgs>;

export default meta;
type Story = StoryObj<LayoutArgs>;

function createStory(layout: LayoutName): Story {
  return {
    argTypes: { ...LAYOUT_ARG_TYPES, ...ARG_TYPES[layout] },
    args: { layout, ...ARGS[layout] },
  };
}

export const Balance: Story = createStory('balance');
export const Center: Story = createStory('center');
export const Flow: Story = createStory('flow');
export const Layer: Story = createStory('layer');
export const Matrix: Story = createStory('matrix');
export const Pack: Story = createStory('pack');
export const Pin: Story = createStory('pin');
export const Stack: Story = createStory('stack');
export const Tile: Story = createStory('tile');

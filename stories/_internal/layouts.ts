import type { LayoutStyle } from '@fringeworks/style-layouts';
import { centerItem } from '@fringeworks/style-layouts/center';
import { flowItem } from '@fringeworks/style-layouts/flow';
import { layerItem } from '@fringeworks/style-layouts/layer';
import { pinItem } from '@fringeworks/style-layouts/pin';
import { stackItem } from '@fringeworks/style-layouts/stack';
import type { ComponentType } from 'react';
import withBalanceLayout from '../../src/with-css/withBalanceLayout';
import withCenterItem from '../../src/with-css/withCenterItem';
import withCenterLayout from '../../src/with-css/withCenterLayout';
import withFlowItem from '../../src/with-css/withFlowItem';
import withFlowLayout from '../../src/with-css/withFlowLayout';
import withLayerItem from '../../src/with-css/withLayerItem';
import withLayerLayout from '../../src/with-css/withLayerLayout';
import withMatrixLayout from '../../src/with-css/withMatrixLayout';
import withPackLayout from '../../src/with-css/withPackLayout';
import withPinItem from '../../src/with-css/withPinItem';
import withPinLayout from '../../src/with-css/withPinLayout';
import withStackItem from '../../src/with-css/withStackItem';
import withStackLayout from '../../src/with-css/withStackLayout';
import withTileLayout from '../../src/with-css/withTileLayout';
import type { LayoutName } from '../_shared/types';

/**
 * storyで表示するレイアウト
 */
const LAYOUTS: Record<LayoutName, ComponentType<any>> = {
  balance: withBalanceLayout('div'),
  center: withCenterLayout('div'),
  flow: withFlowLayout('div'),
  layer: withLayerLayout('div'),
  matrix: withMatrixLayout('div'),
  pack: withPackLayout('div'),
  pin: withPinLayout('div'),
  stack: withStackLayout('div'),
  tile: withTileLayout('div'),
};
export default LAYOUTS;

/**
 * storyで表示するレイアウトのアイテム
 */
export const LAYOUT_ITEMS: Partial<Record<LayoutName, ComponentType<any>>> = {
  center: withCenterItem('div'),
  flow: withFlowItem('div'),
  layer: withLayerItem('div'),
  pin: withPinItem('div'),
  stack: withStackItem('div'),
};

/**
 * レイアウトのアイテムの関数
 *
 * コンテナとアイテムを兼ねる子要素では、HOCを重ねずにコンテナのコンポーネントへclassName / styleとして渡す
 */
export const LAYOUT_ITEM_FUNCTIONS: Partial<
  Record<LayoutName, (options: Record<string, unknown>) => LayoutStyle>
> = {
  center: centerItem,
  flow: flowItem,
  layer: layerItem,
  pin: pinItem,
  stack: stackItem,
};

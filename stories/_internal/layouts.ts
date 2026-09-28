/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType } from 'react';
import withBalanceLayout from '../../src/with-css/withBalanceLayout';
import withCenterLayout from '../../src/with-css/withCenterLayout';
import withFlowLayout from '../../src/with-css/withFlowLayout';
import withLayerLayout from '../../src/with-css/withLayerLayout';
import withMatrixLayout from '../../src/with-css/withMatrixLayout';
import withPackLayout from '../../src/with-css/withPackLayout';
import withPinLayout from '../../src/with-css/withPinLayout';
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

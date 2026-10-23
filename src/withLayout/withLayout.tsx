import balance from '@fringeworks/style-layouts/balance';
import center from '@fringeworks/style-layouts/center';
import flow from '@fringeworks/style-layouts/flow';
import extractBalanceOptions from '@fringeworks/style-layouts/helpers/extractBalanceOptions';
import extractCenterOptions from '@fringeworks/style-layouts/helpers/extractCenterOptions';
import extractFlowOptions from '@fringeworks/style-layouts/helpers/extractFlowOptions';
import extractLayerOptions from '@fringeworks/style-layouts/helpers/extractLayerOptions';
import extractMatrixOptions from '@fringeworks/style-layouts/helpers/extractMatrixOptions';
import extractPackOptions from '@fringeworks/style-layouts/helpers/extractPackOptions';
import extractPinOptions from '@fringeworks/style-layouts/helpers/extractPinOptions';
import extractStackOptions from '@fringeworks/style-layouts/helpers/extractStackOptions';
import extractTileOptions from '@fringeworks/style-layouts/helpers/extractTileOptions';
import layer from '@fringeworks/style-layouts/layer';
import matrix from '@fringeworks/style-layouts/matrix';
import pack from '@fringeworks/style-layouts/pack';
import pin from '@fringeworks/style-layouts/pin';
import stack from '@fringeworks/style-layouts/stack';
import tile from '@fringeworks/style-layouts/tile';
import { unsafeCast } from '@fringeworks/utils';
import type { ElementType } from 'react';
import type { AnyLayoutDefinition } from '../_internal/withLayoutBase';
import withLayoutBase from '../_internal/withLayoutBase';
import type { LayoutType } from '../constants';
import type { LayoutComponent, WithLayoutOptions } from './types';

/**
 * レイアウト種別ごとのレイアウトの組
 *
 * - `LayoutType`の全ての値を網羅していないと型エラーになる
 */
const LAYOUTS = {
  balance: [balance, extractBalanceOptions],
  center: [center, extractCenterOptions],
  flow: [flow, extractFlowOptions],
  layer: [layer, extractLayerOptions],
  matrix: [matrix, extractMatrixOptions],
  pack: [pack, extractPackOptions],
  pin: [pin, extractPinOptions],
  stack: [stack, extractStackOptions],
  tile: [tile, extractTileOptions],
} as const satisfies Record<LayoutType, AnyLayoutDefinition>;

/**
 * コンテナの機能を追加するHOC
 *
 * - `layout`プロパティで適用するレイアウトを選択する
 * - `LayoutType`以外の`layout`を指定した場合は、レイアウトを適用しない
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withLayout<C extends ElementType>(
  Component: C,
  options: WithLayoutOptions = {},
): LayoutComponent<C> {
  // 動的に選択される各レイアウトのプロパティの型は、判別共用体の`WithLayoutProps`で表現するため、
  // 内部で組み立てた型と公開シグネチャの型の辻褄をここで合わせる
  return unsafeCast<LayoutComponent<C>>(
    withLayoutBase('withLayout', Component, LAYOUTS, options),
  );
}

import balance from '@niche-works/style-layouts/balance';
import center from '@niche-works/style-layouts/center';
import flow from '@niche-works/style-layouts/flow';
import layer from '@niche-works/style-layouts/layer';
import matrix from '@niche-works/style-layouts/matrix';
import pack from '@niche-works/style-layouts/pack';
import pin from '@niche-works/style-layouts/pin';
import stack from '@niche-works/style-layouts/stack';
import tile from '@niche-works/style-layouts/tile';
import { unsafeCast } from '@niche-works/utils';
import type { ElementType } from 'react';
import withLayoutBase from '../_internal/withLayoutBase';
import type { LayoutComponent, WithLayoutOptions } from './types';

const LAYOUTS = {
  balance,
  center,
  flow,
  layer,
  matrix,
  pack,
  pin,
  stack,
  tile,
} as const;

/**
 * コンテナーのレイアウト機能を追加するHOC
 *
 * - `layout`プロパティで適用するレイアウトを選択する
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
    withLayoutBase(Component, LAYOUTS, options),
  );
}

import extractTileOptions from '@fringeworks/style-layouts/helpers/extractTileOptions';
import tile from '@fringeworks/style-layouts/tile';
import type { ElementType } from 'react';
import withLayoutBase from '../_internal/withLayoutBase';
import type { TileLayoutComponent, WithTileLayoutOptions } from './types';

/**
 * tileレイアウトのコンテナの機能を追加するHOC
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withTileLayout<C extends ElementType>(
  Component: C,
  options: WithTileLayoutOptions = {},
): TileLayoutComponent<C> {
  return withLayoutBase(
    'withTileLayout',
    Component,
    [tile, extractTileOptions],
    options,
  );
}

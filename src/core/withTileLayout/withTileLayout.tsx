import tile from '@niche-works/style-layouts/tile';
import type { ElementType } from 'react';
import withLayoutBase from '../_internal/withLayoutBase';
import type { WithTileLayoutOptions } from './types';

/**
 * コンテナーのレイアウト機能を追加するHOC
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withTileLayout<C extends ElementType>(
  Component: C,
  options: WithTileLayoutOptions = {},
) {
  return withLayoutBase(Component, tile, options);
}

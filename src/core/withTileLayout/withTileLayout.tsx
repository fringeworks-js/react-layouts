import tile from '@niche-works/style-layouts/tile';
import type { LooseDictionary } from '@niche-works/types';
import type {
  ElementType,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react';
import withLayoutBase from '../_internal/withLayoutBase';
import type { WithTileLayoutOptions, WithTileLayoutProps } from './types';

/**
 * コンテナーのレイアウト機能を追加するHOC
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withTileLayout<P = LooseDictionary, T = unknown>(
  Component: ElementType<P>,
  options: WithTileLayoutOptions = {},
): ForwardRefExoticComponent<
  PropsWithoutRef<P & WithTileLayoutProps> & RefAttributes<T>
> {
  return withLayoutBase(Component, tile, options);
}

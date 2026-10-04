import layer from '@fringeworks/style-layouts/layer';
import type { ElementType } from 'react';
import withLayoutBase from '../_internal/withLayoutBase';
import type { LayerLayoutComponent, WithLayerLayoutOptions } from './types';

/**
 * コンテナーのレイアウト機能を追加するHOC
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withLayerLayout<C extends ElementType>(
  Component: C,
  options: WithLayerLayoutOptions = {},
): LayerLayoutComponent<C> {
  return withLayoutBase(Component, layer, options);
}

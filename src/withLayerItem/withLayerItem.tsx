import extractLayerItemOptions from '@fringeworks/style-layouts/helpers/extractLayerItemOptions';
import { layerItem } from '@fringeworks/style-layouts/layer';
import type { ElementType } from 'react';
import withLayoutBase from '../_internal/withLayoutBase';
import type { LayerItemComponent, WithLayerItemOptions } from './types';

/**
 * layerレイアウトの子要素の機能を追加するHOC
 *
 * - 指定したオプションだけ、コンテナ（withLayerLayout）の指定を上書きする
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withLayerItem<C extends ElementType>(
  Component: C,
  options: WithLayerItemOptions = {},
): LayerItemComponent<C> {
  return withLayoutBase(
    'withLayerItem',
    Component,
    [layerItem, extractLayerItemOptions],
    options,
  );
}

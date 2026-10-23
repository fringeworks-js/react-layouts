import center from '@fringeworks/style-layouts/center';
import extractCenterOptions from '@fringeworks/style-layouts/helpers/extractCenterOptions';
import type { ElementType } from 'react';
import withLayoutBase from '../_internal/withLayoutBase';
import type { CenterLayoutComponent, WithCenterLayoutOptions } from './types';

/**
 * centerレイアウトのコンテナの機能を追加するHOC
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withCenterLayout<C extends ElementType>(
  Component: C,
  options: WithCenterLayoutOptions = {},
): CenterLayoutComponent<C> {
  return withLayoutBase(
    'withCenterLayout',
    Component,
    [center, extractCenterOptions],
    options,
  );
}

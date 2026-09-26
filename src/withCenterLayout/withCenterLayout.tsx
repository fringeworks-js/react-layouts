import center from '@niche-works/style-layouts/center';
import type { ElementType } from 'react';
import withLayoutBase from '../_internal/withLayoutBase';
import type { CenterLayoutComponent, WithCenterLayoutOptions } from './types';

/**
 * コンテナーのレイアウト機能を追加するHOC
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withCenterLayout<C extends ElementType>(
  Component: C,
  options: WithCenterLayoutOptions = {},
): CenterLayoutComponent<C> {
  return withLayoutBase(Component, center, options);
}

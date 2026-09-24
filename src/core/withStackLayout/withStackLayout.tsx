import stack from '@niche-works/style-layouts/stack';
import type { ElementType } from 'react';
import withLayoutBase from '../_internal/withLayoutBase';
import type { WithStackLayoutOptions } from './types';

/**
 * コンテナーのレイアウト機能を追加するHOC
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withStackLayout<C extends ElementType>(
  Component: C,
  options: WithStackLayoutOptions = {},
) {
  return withLayoutBase(Component, stack, options);
}

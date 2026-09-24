import stack from '@niche-works/style-layouts/stack';
import type { LooseDictionary } from '@niche-works/types';
import type { ElementType } from 'react';
import withLayoutBase from '../_internal/withLayoutBase';
import type { WithStackLayoutOptions, WithStackLayoutProps } from './types';

/**
 * コンテナーのレイアウト機能を追加するHOC
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withStackLayout<P = LooseDictionary, T = unknown>(
  Component: ElementType<P>,
  options: WithStackLayoutOptions = {},
) {
  return withLayoutBase<WithStackLayoutProps, P, T>(Component, stack, options);
}

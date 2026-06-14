import flow from '@niche-works/style-layouts/flow';
import type { LooseDictionary } from '@niche-works/types';
import type {
  ElementType,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react';
import withLayoutBase from '../_internal/withLayoutBase';
import type { WithFlowLayoutOptions, WithFlowLayoutProps } from './types';

/**
 * コンテナーのレイアウト機能を追加するHOC
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withFlowLayout<P = LooseDictionary, T = unknown>(
  Component: ElementType<P>,
  options: WithFlowLayoutOptions = {},
): ForwardRefExoticComponent<
  PropsWithoutRef<P & WithFlowLayoutProps> & RefAttributes<T>
> {
  return withLayoutBase(Component, flow, options);
}

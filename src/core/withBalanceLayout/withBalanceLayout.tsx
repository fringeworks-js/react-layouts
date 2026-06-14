import balance from '@niche-works/style-layouts/balance';
import type { LooseDictionary } from '@niche-works/types';
import type {
  ElementType,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react';
import withLayoutBase from '../_internal/withLayoutBase';
import type { WithBalanceLayoutOptions, WithBalanceLayoutProps } from './types';

/**
 * コンテナーのレイアウト機能を追加するHOC
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withBalanceLayout<P = LooseDictionary, T = unknown>(
  Component: ElementType<P>,
  options: WithBalanceLayoutOptions = {},
): ForwardRefExoticComponent<
  PropsWithoutRef<P & WithBalanceLayoutProps> & RefAttributes<T>
> {
  return withLayoutBase(Component, balance, options);
}

import balance from '@niche-works/style-layouts/balance';
import type { ElementType } from 'react';
import withLayoutBase from '../_internal/withLayoutBase';
import type { BalanceLayoutComponent, WithBalanceLayoutOptions } from './types';

/**
 * コンテナーのレイアウト機能を追加するHOC
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withBalanceLayout<C extends ElementType>(
  Component: C,
  options: WithBalanceLayoutOptions = {},
): BalanceLayoutComponent<C> {
  return withLayoutBase(Component, balance, options);
}

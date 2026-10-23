import balance from '@fringeworks/style-layouts/balance';
import extractBalanceOptions from '@fringeworks/style-layouts/helpers/extractBalanceOptions';
import type { ElementType } from 'react';
import withLayoutBase from '../_internal/withLayoutBase';
import type { BalanceLayoutComponent, WithBalanceLayoutOptions } from './types';

/**
 * balanceレイアウトのコンテナの機能を追加するHOC
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withBalanceLayout<C extends ElementType>(
  Component: C,
  options: WithBalanceLayoutOptions = {},
): BalanceLayoutComponent<C> {
  return withLayoutBase(
    'withBalanceLayout',
    Component,
    [balance, extractBalanceOptions],
    options,
  );
}

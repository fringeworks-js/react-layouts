import type { BalanceLayoutOptions } from '@fringeworks/style-layouts/balance';
import type { ElementType } from 'react';
import type {
  LayoutComponentBase,
  WithLayoutBaseOptions,
} from '../_internal/withLayoutBase';

export type WithBalanceLayoutProps = BalanceLayoutOptions;

export type WithBalanceLayoutOptions = WithLayoutBaseOptions;

export type BalanceLayoutComponent<C extends ElementType> = LayoutComponentBase<
  C,
  BalanceLayoutOptions
>;

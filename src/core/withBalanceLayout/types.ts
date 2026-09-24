import type { BalanceLayoutOptions } from '@niche-works/style-layouts/balance';
import type { ElementType } from 'react';
import type {
  LayoutComponent,
  WithLayoutBaseOptions,
} from '../_internal/withLayoutBase';

export type WithBalanceLayoutProps = BalanceLayoutOptions;

export type WithBalanceLayoutOptions = WithLayoutBaseOptions;

export type BalanceLayoutComponent<C extends ElementType> = LayoutComponent<
  C,
  BalanceLayoutOptions
>;

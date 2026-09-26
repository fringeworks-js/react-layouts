import type { StackLayoutOptions } from '@niche-works/style-layouts/stack';
import type { ElementType } from 'react';
import type {
  LayoutComponentBase,
  WithLayoutBaseOptions,
} from '../_internal/withLayoutBase';

export type WithStackLayoutProps = StackLayoutOptions;

export type WithStackLayoutOptions = WithLayoutBaseOptions;

export type StackLayoutComponent<C extends ElementType> = LayoutComponentBase<
  C,
  StackLayoutOptions
>;

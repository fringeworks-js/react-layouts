import type { PackLayoutOptions } from '@fringeworks/style-layouts/pack';
import type { ElementType } from 'react';
import type {
  LayoutComponentBase,
  WithLayoutBaseOptions,
} from '../_internal/withLayoutBase';

export type WithPackLayoutProps = PackLayoutOptions;

export type WithPackLayoutOptions = WithLayoutBaseOptions;

export type PackLayoutComponent<C extends ElementType> = LayoutComponentBase<
  C,
  PackLayoutOptions
>;

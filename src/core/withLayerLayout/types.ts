import type { LayerLayoutOptions } from '@niche-works/style-layouts/layer';
import type { ElementType } from 'react';
import type {
  LayoutComponentBase,
  WithLayoutBaseOptions,
} from '../_internal/withLayoutBase';

export type WithLayerLayoutProps = LayerLayoutOptions;

export type WithLayerLayoutOptions = WithLayoutBaseOptions;

export type LayerLayoutComponent<C extends ElementType> = LayoutComponentBase<
  C,
  LayerLayoutOptions
>;

import type { LayerItemOptions } from '@fringeworks/style-layouts/layer';
import type { ElementType } from 'react';
import type {
  LayoutComponentBase,
  WithLayoutBaseOptions,
} from '../_internal/withLayoutBase';

export type WithLayerItemProps = LayerItemOptions;

export type WithLayerItemOptions = WithLayoutBaseOptions;

export type LayerItemComponent<C extends ElementType> = LayoutComponentBase<
  C,
  LayerItemOptions
>;

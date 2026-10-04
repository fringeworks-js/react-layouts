import type { TileLayoutOptions } from '@fringeworks/style-layouts/tile';
import type { ElementType } from 'react';
import type {
  LayoutComponentBase,
  WithLayoutBaseOptions,
} from '../_internal/withLayoutBase';

export type WithTileLayoutProps = TileLayoutOptions;

export type WithTileLayoutOptions = WithLayoutBaseOptions;

export type TileLayoutComponent<C extends ElementType> = LayoutComponentBase<
  C,
  TileLayoutOptions
>;

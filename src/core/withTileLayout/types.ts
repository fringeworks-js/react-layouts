import type { TileLayoutOptions } from '@niche-works/style-layouts/tile';
import type { ElementType } from 'react';
import type {
  LayoutComponent,
  WithLayoutBaseOptions,
} from '../_internal/withLayoutBase';

export type WithTileLayoutProps = TileLayoutOptions;

export type WithTileLayoutOptions = WithLayoutBaseOptions;

export type TileLayoutComponent<C extends ElementType> = LayoutComponent<
  C,
  TileLayoutOptions
>;

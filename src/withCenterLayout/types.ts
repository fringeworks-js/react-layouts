import type { CenterLayoutOptions } from '@fringeworks/style-layouts/center';
import type { ElementType } from 'react';
import type {
  LayoutComponentBase,
  WithLayoutBaseOptions,
} from '../_internal/withLayoutBase';

export type WithCenterLayoutProps = CenterLayoutOptions;

export type WithCenterLayoutOptions = WithLayoutBaseOptions;

export type CenterLayoutComponent<C extends ElementType> = LayoutComponentBase<
  C,
  CenterLayoutOptions
>;

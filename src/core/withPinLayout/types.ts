import type { PinLayoutOptions } from '@niche-works/style-layouts/pin';
import type { ElementType } from 'react';
import type {
  LayoutComponent,
  WithLayoutBaseOptions,
} from '../_internal/withLayoutBase';

export type WithPinLayoutProps = PinLayoutOptions;

export type WithPinLayoutOptions = WithLayoutBaseOptions;

export type PinLayoutComponent<C extends ElementType> = LayoutComponent<
  C,
  PinLayoutOptions
>;

import type { FlowLayoutOptions } from '@niche-works/style-layouts/flow';
import type { ElementType } from 'react';
import type {
  LayoutComponent,
  WithLayoutBaseOptions,
} from '../_internal/withLayoutBase';

export type WithFlowLayoutProps = FlowLayoutOptions;

export type WithFlowLayoutOptions = WithLayoutBaseOptions;

export type FlowLayoutComponent<C extends ElementType> = LayoutComponent<
  C,
  FlowLayoutOptions
>;

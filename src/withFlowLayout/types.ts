import type { FlowLayoutOptions } from '@fringeworks/style-layouts/flow';
import type { ElementType } from 'react';
import type {
  LayoutComponentBase,
  WithLayoutBaseOptions,
} from '../_internal/withLayoutBase';

export type WithFlowLayoutProps = FlowLayoutOptions;

export type WithFlowLayoutOptions = WithLayoutBaseOptions;

export type FlowLayoutComponent<C extends ElementType> = LayoutComponentBase<
  C,
  FlowLayoutOptions
>;

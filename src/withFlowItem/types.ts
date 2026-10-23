import type { FlowItemOptions } from '@fringeworks/style-layouts/flow';
import type { ElementType } from 'react';
import type {
  LayoutComponentBase,
  WithLayoutBaseOptions,
} from '../_internal/withLayoutBase';

export type WithFlowItemProps = FlowItemOptions;

export type WithFlowItemOptions = WithLayoutBaseOptions;

export type FlowItemComponent<C extends ElementType> = LayoutComponentBase<
  C,
  FlowItemOptions
>;

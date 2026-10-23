import type { StackItemOptions } from '@fringeworks/style-layouts/stack';
import type { ElementType } from 'react';
import type {
  LayoutComponentBase,
  WithLayoutBaseOptions,
} from '../_internal/withLayoutBase';

export type WithStackItemProps = StackItemOptions;

export type WithStackItemOptions = WithLayoutBaseOptions;

export type StackItemComponent<C extends ElementType> = LayoutComponentBase<
  C,
  StackItemOptions
>;

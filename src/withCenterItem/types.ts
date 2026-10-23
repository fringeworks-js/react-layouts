import type { CenterItemOptions } from '@fringeworks/style-layouts/center';
import type { ElementType } from 'react';
import type {
  LayoutComponentBase,
  WithLayoutBaseOptions,
} from '../_internal/withLayoutBase';

export type WithCenterItemProps = CenterItemOptions;

export type WithCenterItemOptions = WithLayoutBaseOptions;

export type CenterItemComponent<C extends ElementType> = LayoutComponentBase<
  C,
  CenterItemOptions
>;

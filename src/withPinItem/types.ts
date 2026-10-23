import type { PinItemOptions } from '@fringeworks/style-layouts/pin';
import type { ElementType } from 'react';
import type {
  LayoutComponentBase,
  WithLayoutBaseOptions,
} from '../_internal/withLayoutBase';

export type WithPinItemProps = PinItemOptions;

export type WithPinItemOptions = WithLayoutBaseOptions;

export type PinItemComponent<C extends ElementType> = LayoutComponentBase<
  C,
  PinItemOptions
>;

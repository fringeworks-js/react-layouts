import type { MatrixLayoutOptions } from '@fringeworks/style-layouts/matrix';
import type { ElementType } from 'react';
import type {
  LayoutComponentBase,
  WithLayoutBaseOptions,
} from '../_internal/withLayoutBase';

export type WithMatrixLayoutProps = MatrixLayoutOptions;

export type WithMatrixLayoutOptions = WithLayoutBaseOptions;

export type MatrixLayoutComponent<C extends ElementType> = LayoutComponentBase<
  C,
  MatrixLayoutOptions
>;

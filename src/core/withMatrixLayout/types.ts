import type { MatrixLayoutOptions } from '@niche-works/style-layouts/matrix';
import type { ElementType } from 'react';
import type {
  LayoutComponent,
  WithLayoutBaseOptions,
} from '../_internal/withLayoutBase';

export type WithMatrixLayoutProps = MatrixLayoutOptions;

export type WithMatrixLayoutOptions = WithLayoutBaseOptions;

export type MatrixLayoutComponent<C extends ElementType> = LayoutComponent<
  C,
  MatrixLayoutOptions
>;

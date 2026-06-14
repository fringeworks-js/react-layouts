import type { StyleLayout } from '@niche-works/style-layouts';
import matrix from '@niche-works/style-layouts/matrix';
import type { LooseDictionary } from '@niche-works/types';
import type {
  ElementType,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react';
import withLayoutBase from '../_internal/withLayoutBase';
import type { WithMatrixLayoutOptions, WithMatrixLayoutProps } from './types';

/**
 * コンテナーのレイアウト機能を追加するHOC
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withMatrixLayout<P = LooseDictionary, T = unknown>(
  Component: ElementType<P>,
  options: WithMatrixLayoutOptions = {},
): ForwardRefExoticComponent<
  PropsWithoutRef<P & WithMatrixLayoutProps> & RefAttributes<T>
> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return withLayoutBase(Component, matrix as StyleLayout<any>, options) as any;
}

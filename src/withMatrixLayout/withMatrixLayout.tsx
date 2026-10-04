import matrix from '@fringeworks/style-layouts/matrix';
import type { ElementType } from 'react';
import withLayoutBase from '../_internal/withLayoutBase';
import type { MatrixLayoutComponent, WithMatrixLayoutOptions } from './types';

/**
 * コンテナーのレイアウト機能を追加するHOC
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withMatrixLayout<C extends ElementType>(
  Component: C,
  options: WithMatrixLayoutOptions = {},
): MatrixLayoutComponent<C> {
  return withLayoutBase(Component, matrix, options);
}

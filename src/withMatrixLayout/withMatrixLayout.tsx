import extractMatrixOptions from '@fringeworks/style-layouts/helpers/extractMatrixOptions';
import matrix from '@fringeworks/style-layouts/matrix';
import type { ElementType } from 'react';
import withLayoutBase from '../_internal/withLayoutBase';
import type { MatrixLayoutComponent, WithMatrixLayoutOptions } from './types';

/**
 * matrixレイアウトのコンテナの機能を追加するHOC
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withMatrixLayout<C extends ElementType>(
  Component: C,
  options: WithMatrixLayoutOptions = {},
): MatrixLayoutComponent<C> {
  return withLayoutBase(
    'withMatrixLayout',
    Component,
    [matrix, extractMatrixOptions],
    options,
  );
}

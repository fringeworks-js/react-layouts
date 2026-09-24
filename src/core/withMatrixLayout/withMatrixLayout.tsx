import matrix from '@niche-works/style-layouts/matrix';
import type { ElementType } from 'react';
import withLayoutBase from '../_internal/withLayoutBase';
import type { WithMatrixLayoutOptions } from './types';

/**
 * コンテナーのレイアウト機能を追加するHOC
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withMatrixLayout<C extends ElementType>(
  Component: C,
  options: WithMatrixLayoutOptions = {},
) {
  return withLayoutBase(Component, matrix, options);
}

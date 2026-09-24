import matrix from '@niche-works/style-layouts/matrix';
import type { LooseDictionary } from '@niche-works/types';
import type { ElementType } from 'react';
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
) {
  return withLayoutBase<WithMatrixLayoutProps, P, T>(
    Component,
    matrix,
    options,
  );
}

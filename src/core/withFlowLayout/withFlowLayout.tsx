import flow from '@niche-works/style-layouts/flow';
import type { LooseDictionary } from '@niche-works/types';
import type { ElementType } from 'react';
import withLayoutBase from '../_internal/withLayoutBase';
import type { WithFlowLayoutOptions, WithFlowLayoutProps } from './types';

/**
 * コンテナーのレイアウト機能を追加するHOC
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withFlowLayout<P = LooseDictionary, T = unknown>(
  Component: ElementType<P>,
  options: WithFlowLayoutOptions = {},
) {
  return withLayoutBase<WithFlowLayoutProps, P, T>(Component, flow, options);
}

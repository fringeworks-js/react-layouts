import pack from '@niche-works/style-layouts/pack';
import type { LooseDictionary } from '@niche-works/types';
import type { ElementType } from 'react';
import withLayoutBase from '../_internal/withLayoutBase';
import type { WithPackLayoutOptions, WithPackLayoutProps } from './types';

/**
 * コンテナーのレイアウト機能を追加するHOC
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withPackLayout<P = LooseDictionary, T = unknown>(
  Component: ElementType<P>,
  options: WithPackLayoutOptions = {},
) {
  return withLayoutBase<WithPackLayoutProps, P, T>(Component, pack, options);
}

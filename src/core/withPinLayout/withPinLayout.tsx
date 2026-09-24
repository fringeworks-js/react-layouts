import pin from '@niche-works/style-layouts/pin';
import type { LooseDictionary } from '@niche-works/types';
import type { ElementType } from 'react';
import withLayoutBase from '../_internal/withLayoutBase';
import type { WithPinLayoutOptions, WithPinLayoutProps } from './types';

/**
 * コンテナーのレイアウト機能を追加するHOC
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withPinLayout<P = LooseDictionary, T = unknown>(
  Component: ElementType<P>,
  options: WithPinLayoutOptions = {},
) {
  return withLayoutBase<WithPinLayoutProps, P, T>(Component, pin, options);
}

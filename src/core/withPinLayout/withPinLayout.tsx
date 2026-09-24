import pin from '@niche-works/style-layouts/pin';
import type { ElementType } from 'react';
import withLayoutBase from '../_internal/withLayoutBase';
import type { WithPinLayoutOptions } from './types';

/**
 * コンテナーのレイアウト機能を追加するHOC
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withPinLayout<C extends ElementType>(
  Component: C,
  options: WithPinLayoutOptions = {},
) {
  return withLayoutBase(Component, pin, options);
}

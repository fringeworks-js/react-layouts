import pack from '@fringeworks/style-layouts/pack';
import type { ElementType } from 'react';
import withLayoutBase from '../_internal/withLayoutBase';
import type { PackLayoutComponent, WithPackLayoutOptions } from './types';

/**
 * コンテナーのレイアウト機能を追加するHOC
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withPackLayout<C extends ElementType>(
  Component: C,
  options: WithPackLayoutOptions = {},
): PackLayoutComponent<C> {
  return withLayoutBase(Component, pack, options);
}

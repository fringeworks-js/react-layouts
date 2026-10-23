import extractStackOptions from '@fringeworks/style-layouts/helpers/extractStackOptions';
import stack from '@fringeworks/style-layouts/stack';
import type { ElementType } from 'react';
import withLayoutBase from '../_internal/withLayoutBase';
import type { StackLayoutComponent, WithStackLayoutOptions } from './types';

/**
 * stackレイアウトのコンテナの機能を追加するHOC
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withStackLayout<C extends ElementType>(
  Component: C,
  options: WithStackLayoutOptions = {},
): StackLayoutComponent<C> {
  return withLayoutBase(
    'withStackLayout',
    Component,
    [stack, extractStackOptions],
    options,
  );
}

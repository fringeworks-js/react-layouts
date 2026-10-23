import extractStackItemOptions from '@fringeworks/style-layouts/helpers/extractStackItemOptions';
import { stackItem } from '@fringeworks/style-layouts/stack';
import type { ElementType } from 'react';
import withLayoutBase from '../_internal/withLayoutBase';
import type { StackItemComponent, WithStackItemOptions } from './types';

/**
 * stackレイアウトの子要素の機能を追加するHOC
 *
 * - 指定したオプションだけ、コンテナ（withStackLayout）の指定を上書きする
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withStackItem<C extends ElementType>(
  Component: C,
  options: WithStackItemOptions = {},
): StackItemComponent<C> {
  return withLayoutBase(
    'withStackItem',
    Component,
    [stackItem, extractStackItemOptions],
    options,
  );
}

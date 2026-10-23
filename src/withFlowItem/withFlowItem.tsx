import { flowItem } from '@fringeworks/style-layouts/flow';
import extractFlowItemOptions from '@fringeworks/style-layouts/helpers/extractFlowItemOptions';
import type { ElementType } from 'react';
import withLayoutBase from '../_internal/withLayoutBase';
import type { FlowItemComponent, WithFlowItemOptions } from './types';

/**
 * flowレイアウトの子要素の機能を追加するHOC
 *
 * - 指定したオプションだけ、コンテナ（withFlowLayout）の指定を上書きする
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withFlowItem<C extends ElementType>(
  Component: C,
  options: WithFlowItemOptions = {},
): FlowItemComponent<C> {
  return withLayoutBase(
    'withFlowItem',
    Component,
    [flowItem, extractFlowItemOptions],
    options,
  );
}

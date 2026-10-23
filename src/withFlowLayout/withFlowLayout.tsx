import flow from '@fringeworks/style-layouts/flow';
import extractFlowOptions from '@fringeworks/style-layouts/helpers/extractFlowOptions';
import type { ElementType } from 'react';
import withLayoutBase from '../_internal/withLayoutBase';
import type { FlowLayoutComponent, WithFlowLayoutOptions } from './types';

/**
 * flowレイアウトのコンテナの機能を追加するHOC
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withFlowLayout<C extends ElementType>(
  Component: C,
  options: WithFlowLayoutOptions = {},
): FlowLayoutComponent<C> {
  return withLayoutBase(
    'withFlowLayout',
    Component,
    [flow, extractFlowOptions],
    options,
  );
}

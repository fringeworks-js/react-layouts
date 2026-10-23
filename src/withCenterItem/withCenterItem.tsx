import { centerItem } from '@fringeworks/style-layouts/center';
import extractCenterItemOptions from '@fringeworks/style-layouts/helpers/extractCenterItemOptions';
import type { ElementType } from 'react';
import withLayoutBase from '../_internal/withLayoutBase';
import type { CenterItemComponent, WithCenterItemOptions } from './types';

/**
 * centerレイアウトの子要素の機能を追加するHOC
 *
 * - 指定したオプションだけ、コンテナ（withCenterLayout）の指定を上書きする
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withCenterItem<C extends ElementType>(
  Component: C,
  options: WithCenterItemOptions = {},
): CenterItemComponent<C> {
  return withLayoutBase(
    'withCenterItem',
    Component,
    [centerItem, extractCenterItemOptions],
    options,
  );
}

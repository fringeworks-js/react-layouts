import extractPinItemOptions from '@fringeworks/style-layouts/helpers/extractPinItemOptions';
import { pinItem } from '@fringeworks/style-layouts/pin';
import type { ElementType } from 'react';
import withLayoutBase from '../_internal/withLayoutBase';
import type { PinItemComponent, WithPinItemOptions } from './types';

/**
 * pinレイアウトの子要素の機能を追加するHOC
 *
 * - 指定したオプションだけ、コンテナ（withPinLayout）の指定を上書きする
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withPinItem<C extends ElementType>(
  Component: C,
  options: WithPinItemOptions = {},
): PinItemComponent<C> {
  return withLayoutBase(
    'withPinItem',
    Component,
    [pinItem, extractPinItemOptions],
    options,
  );
}

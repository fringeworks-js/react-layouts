import pin from '@niche-works/style-layouts/pin';
import type { LooseDictionary } from '@niche-works/types';
import type {
  ElementType,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react';
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
): ForwardRefExoticComponent<
  PropsWithoutRef<P & WithPinLayoutProps> & RefAttributes<T>
> {
  return withLayoutBase(Component, pin, options);
}

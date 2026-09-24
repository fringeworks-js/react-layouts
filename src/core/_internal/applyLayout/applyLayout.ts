import type { StyleLayout } from '@niche-works/style-layouts';
import type { LooseDictionary } from '@niche-works/types';
import clsx from 'clsx';
import type { CSSProperties } from 'react';
import type { ApplyLayoutOptions, ApplyLayoutResult } from './types';

/**
 * レイアウト用のスタイルを適用する
 * @returns
 */
export default function applyLayout<
  P extends LooseDictionary = LooseDictionary,
>(
  layout: StyleLayout,
  options: ApplyLayoutOptions<P> = {} as P,
): ApplyLayoutResult {
  const { className, scroll, style: optionStyle, ...rest } = options;
  const style: CSSProperties = { ...optionStyle };
  // コンテナーのスタイル
  const { className: layoutedClassName, style: layoutedStyle } = layout(rest);
  if (scroll) {
    style.overflow = 'auto';
  }
  if (layoutedStyle) {
    // スタイルのマージ
    Object.assign(style, layoutedStyle);
  }

  return {
    className: clsx(className, layoutedClassName),
    style,
  };
}

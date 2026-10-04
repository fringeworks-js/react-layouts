import type { CreateLayoutStyle } from '@fringeworks/style-layouts';
import type { LooseDictionary } from '@fringeworks/types';
import { unsafeCast } from '@fringeworks/utils';
import clsx from 'clsx';
import type { CSSProperties } from 'react';
import type { ApplyLayoutOptions, ApplyLayoutResult } from './types';

/**
 * レイアウト用のスタイルを適用する
 * @param layout レイアウトを作る関数
 * @param options レイアウトのオプション
 * @returns
 */
export default function applyLayout<O extends object = LooseDictionary>(
  layout: CreateLayoutStyle<O>,
  options: ApplyLayoutOptions<O> = unsafeCast<ApplyLayoutOptions<O>>({}),
): ApplyLayoutResult {
  const { className, scroll, style: optionStyle, ...rest } = options;
  const style: CSSProperties = { ...optionStyle };
  // コンテナーのスタイル
  const { className: layoutedClassName, style: layoutedStyle } = layout(
    unsafeCast<O>(rest),
  );
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

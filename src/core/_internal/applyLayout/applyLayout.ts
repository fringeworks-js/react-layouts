import type { CreateLayout } from '@niche-works/style-layouts';
import type { LooseDictionary } from '@niche-works/types';
import type { ApplyLayoutOptions, ApplyLayoutResult } from './types';

/**
 * レイアウト用のスタイルを適用する
 * @returns
 */
export default function applyLayout<
  P extends LooseDictionary = LooseDictionary,
>(
  layout: CreateLayout,
  options: ApplyLayoutOptions<P> = {} as P,
): ApplyLayoutResult {
  const { scroll, style, ...rest } = options;
  // コンテナーのスタイル
  const { className, style: layoutedStyle = {} } = layout(rest);
  if (scroll) {
    layoutedStyle.overflow = 'auto';
  }
  if (style) {
    // スタイルのマージ
    Object.assign(layoutedStyle, style);
  }

  return {
    className,
    style: layoutedStyle,
  };
}

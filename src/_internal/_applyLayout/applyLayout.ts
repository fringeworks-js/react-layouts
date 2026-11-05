import clsx from 'clsx';
import type { CSSProperties } from 'react';
import type { ApplyLayoutResult, LayoutFunction } from './types';

/**
 * レイアウト用のクラスとスタイルを作る
 *
 * - ユーザーが指定したクラス・スタイルとのマージは呼び出し側で行う
 * @param layout レイアウトを作る関数
 * @param options レイアウトのオプション
 * @param scroll スクロールの有無（`true`の場合は`overflow: auto`を加える）
 * @returns
 */
export default function applyLayout<O>(
  layout: LayoutFunction<O>,
  options: O,
  scroll = false,
): ApplyLayoutResult {
  const { className, style: layoutStyle } = layout(options);
  const style: CSSProperties = { ...layoutStyle };
  if (scroll) {
    style.overflow = 'auto';
  }
  return { className: clsx(className), style };
}

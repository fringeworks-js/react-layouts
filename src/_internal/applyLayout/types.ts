import type { LooseDictionary } from '@niche-works/types';
import type { CSSProperties } from 'react';

/**
 * レイアウト機能が消費する共通のプロパティ
 */
export type LayoutBaseProps = {
  /**
   * クラス
   */
  className?: string;

  /**
   * スクロールの有無
   */
  scroll?: boolean;

  /**
   * スタイル
   */
  style?: CSSProperties;
};

/**
 * レイアウト用のスタイルを適用する際のオプション
 */
export type ApplyLayoutOptions<O extends object = LooseDictionary> = O &
  LayoutBaseProps;

export type ApplyLayoutResult = {
  /**
   * クラス
   */
  className: string;

  /**
   * スタイル
   */
  style: CSSProperties;
};

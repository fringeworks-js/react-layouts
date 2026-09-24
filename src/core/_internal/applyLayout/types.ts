import type { LooseDictionary } from '@niche-works/types';
import type { CSSProperties } from 'react';

export type ApplyLayoutOptions<P extends LooseDictionary = LooseDictionary> =
  P & {
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

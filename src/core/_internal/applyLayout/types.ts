import type { LayoutResult } from '@niche-works/style-layouts';
import type { LooseDictionary } from '@niche-works/types';
import type { CSSProperties } from 'react';

export type ApplyLayoutOptions<P extends LooseDictionary = LooseDictionary> =
  P & {
    /**
     * スクロールの有無
     */
    scroll?: boolean;

    /**
     * スタイル
     */
    style?: CSSProperties;
  };

export type ApplyLayoutResult = LayoutResult;

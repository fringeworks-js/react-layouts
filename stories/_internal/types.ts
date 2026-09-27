import { LooseDictionary } from '@niche-works/types';
import type { ResizableProps } from 're-resizable';
import { ElementType } from 'react';
import type { WithLayoutProps } from '../../src/_internal/withLayoutBase';

export type DebugOptions = {
  /**
   * コンテナーの幅
   */
  containerWidth?: number | string;

  /**
   * コンテナーの高さ
   */
  containerHeight?: number | string;

  /**
   * 子要素の数
   */
  itemCount?: number;

  /**
   * 子要素の幅・高さの決め方
   */
  sizeType?: 'none' | 'rand' | 'static';

  /**
   * 子要素の位置に決め方
   */
  posType?: 'none' | 'rand' | 'static';
};

export type ResizableContainerProps<
  C extends ElementType = ElementType,
  O = LooseDictionary,
> = WithLayoutProps<C, O> &
  ResizableProps & {
    itemCount: number;
    sizeType?: string;
    posType?: string;
  };

import type {
  Adjust,
  AlignX,
  AlignY,
  Direction,
} from '@niche-works/style-layouts/constants';

/**
 * 子要素を並べる方向
 */
export type DirectionOptions<D extends Direction = Direction> = {
  /**
   * 並べる方向
   */
  direction?: D;
};

/**
 * 子要素の位置
 */
export type AlignOptions = {
  /**
   * 子要素の横位置
   */
  alignX?: AlignX;

  /**
   * 子要素の縦位置
   */
  alignY?: AlignY;
};

/**
 * 子要素のサイズ調整
 */
export type AdjustOptions = {
  /**
   * 子要素の幅の調整
   * itemSizeXを指定した場合に有効
   * デフォルトは`none`
   */
  adjustX?: Adjust;

  /**
   * 子要素の高さの調整
   * itemSizeYを指定した場合に有効
   * デフォルトは`none`
   */
  adjustY?: Adjust;
};

/**
 * 要素間の余白
 */
export type GapOptions = {
  /**
   * 余白
   */
  gap?: ChildSpacing;

  /**
   * 横方向の余白
   */
  gapX?: ChildSpacing;

  /**
   * 縦方向の余白
   */
  gapY?: ChildSpacing;
};

/**
 * 子要素のサイズ
 */
export type ItemSizeOptions = {
  /**
   * 子要素の幅
   */
  itemSizeX?: ChildSize;

  /**
   * 子要素の高さ
   */
  itemSizeY?: ChildSize;
};

/**
 * 子要素の割合
 */
export type ItemRatioOptions = {
  itemRatioX?: number;

  itemRatioY?: number;
};

/**
 * 子要素の数
 */
export type ItemCountOptions = {
  /**
   * 横方向の要素数
   */
  itemCountX?: number;

  /**
   * 縦方向の要素数
   */
  itemCountY?: number;
};

/**
 * childのテンプレート
 */
export type TracksOptions = {
  /**
   * 横方向の設定
   * このプロパティが設定されている場合、itemCountX,itemSizeXは無効
   */
  tracksX?: (string | number)[];

  /**
   * 縦方向の設定
   * このプロパティが設定されている場合、itemCountY,itemSizeYは無効
   */
  tracksY?: (string | number)[];
};

/**
 * 子要素の高さ or 幅
 */
export type ChildSize = number | string;

/**
 * 余白
 */
export type ChildSpacing = number | string;

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

export {
  Adjust,
  AlignX,
  AlignY,
  Direction,
} from '@niche-works/style-layouts/constants';

/**
 * レイアウト種別
 */
export const LayoutType = {
  balance: 'balance',
  center: 'center',
  flow: 'flow',
  layer: 'layer',
  matrix: 'matrix',
  pack: 'pack',
  pin: 'pin',
  stack: 'stack',
  tile: 'tile',
} as const;
export type LayoutType = (typeof LayoutType)[keyof typeof LayoutType];

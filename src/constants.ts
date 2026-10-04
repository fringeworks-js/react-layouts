export {
  Adjust,
  AlignX,
  AlignXBase,
  AlignY,
  AlignYBase,
  Direction,
} from '@fringeworks/style-layouts/constants';

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

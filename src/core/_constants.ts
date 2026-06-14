import type {
  BalanceLayoutOptions,
  FlowLayoutOptions,
  MatrixLayoutOptions,
  PackLayoutOptions,
  PinLayoutOptions,
  StackLayoutOptions,
  StyleLayout,
  TileLayoutOptions,
} from '@niche-works/style-layouts';
import {
  balance,
  flow,
  matrix,
  pack,
  pin,
  stack,
  tile,
} from '@niche-works/style-layouts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LAYOUTS: Record<string, StyleLayout<any>> = {
  balance,
  flow,
  matrix,
  pack,
  pin,
  stack,
  tile,
} as const;

export const LAYOUT_PROPS_KEYS: {
  [K in keyof Required<
    BalanceLayoutOptions &
      FlowLayoutOptions &
      MatrixLayoutOptions &
      PackLayoutOptions &
      PinLayoutOptions &
      StackLayoutOptions &
      TileLayoutOptions
  >]: 1;
} = {
  direction: 1,
  alignX: 1,
  alignY: 1,
  adjustX: 1,
  adjustY: 1,
  gap: 1,
  gapX: 1,
  gapY: 1,
  childSizeX: 1,
  childSizeY: 1,
  childRatioX: 1,
  childRatioY: 1,
  childCountX: 1,
  childCountY: 1,
  tracksX: 1,
  tracksY: 1,
};

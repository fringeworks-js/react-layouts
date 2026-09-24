import type {
  BalanceLayoutOptions,
  FlowLayoutOptions,
  MatrixLayoutOptions,
  PackLayoutOptions,
  PinLayoutOptions,
  StackLayoutOptions,
  TileLayoutOptions,
} from '@niche-works/style-layouts';
import type { ApplyLayoutOptions } from '../applyLayout';

export const LAYOUT_PROPS_KEYS: {
  [K in keyof Required<
    ApplyLayoutOptions &
      BalanceLayoutOptions &
      FlowLayoutOptions &
      MatrixLayoutOptions &
      PackLayoutOptions &
      PinLayoutOptions &
      StackLayoutOptions &
      TileLayoutOptions
  >]: 1;
} = {
  className: 1,
  scroll: 1,
  style: 1,
  direction: 1,
  alignX: 1,
  alignY: 1,
  adjustX: 1,
  adjustY: 1,
  gap: 1,
  gapX: 1,
  gapY: 1,
  itemSizeX: 1,
  itemSizeY: 1,
  itemRatioX: 1,
  itemRatioY: 1,
  itemCountX: 1,
  itemCountY: 1,
  tracksX: 1,
  tracksY: 1,
} as const;

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Adjust,
  AlignX,
  AlignY,
  Direction,
} from '@niche-works/style-layouts/constants';
import '@niche-works/style-layouts/core/balance.css';
import '@niche-works/style-layouts/core/center.css';
import '@niche-works/style-layouts/core/flow.css';
import '@niche-works/style-layouts/core/layer.css';
import '@niche-works/style-layouts/core/matrix.css';
import '@niche-works/style-layouts/core/pack.css';
import '@niche-works/style-layouts/core/pin.css';
import '@niche-works/style-layouts/core/stack.css';
import '@niche-works/style-layouts/core/tile.css';
import type { ArgTypes } from '@storybook/react-vite';
import { LayoutType } from '../src/constants';
import type {
  AdjustOptions,
  AlignOptions,
  DebugOptions,
  DirectionOptions,
  GapOptions,
  ItemCountOptions,
  ItemRatioOptions,
  ItemSizeOptions,
  TracksOptions,
} from './types';

export const LAYOUT_OPTIONS = Object.values(LayoutType);

export const DIRECTION_ARG_OPTIONS = Object.values(Direction);

export const ALAGN_X_ARG_OPTIONS = Object.values(AlignX);

export const ALAGN_Y_ARG_OPTIONS = Object.values(AlignY);

export const ADJUST_ARG_OPTIONS = Object.values(Adjust);

export const LAYOUT_ARG_TYPES: ArgTypes = {
  layout: {
    control: { type: 'select' },
    options: LAYOUT_OPTIONS,
  },
  scroll: { type: 'boolean' },
};

export const DIRECTION_ARG_TYPES: ArgTypes<DirectionOptions> = {
  direction: {
    control: 'select',
    options: DIRECTION_ARG_OPTIONS,
  },
};

export const ALIGN_ARG_TYPES: ArgTypes<AlignOptions> = {
  alignX: {
    control: 'select',
    options: ALAGN_X_ARG_OPTIONS,
  },
  alignY: {
    control: 'select',
    options: ALAGN_Y_ARG_OPTIONS,
  },
};

export const ADJUST_ARG_TYPES: ArgTypes<AdjustOptions> = {
  adjustX: {
    control: 'select',
    options: ADJUST_ARG_OPTIONS,
  },
  adjustY: {
    control: 'select',
    options: ADJUST_ARG_OPTIONS,
  },
};

export const ADJUST_DIRECTION_X_ARG_TYPES: ArgTypes<AdjustOptions> = {
  adjustX: {
    control: 'select',
    options: ADJUST_ARG_OPTIONS,
  },
  adjustY: {
    control: 'select',
    options: ['none'],
  },
};

export const ADJUST_DIRECTION_Y_ARG_TYPES: ArgTypes<AdjustOptions> = {
  adjustX: {
    control: 'select',
    options: ['none'],
  },
  adjustY: {
    control: 'select',
    options: ADJUST_ARG_OPTIONS,
  },
};

export const ITEM_SIZE_ARG_TYPES: ArgTypes<ItemSizeOptions> = {
  itemSizeX: {
    control: 'text',
  },
  itemSizeY: {
    control: 'text',
  },
};

export const ITEM_RATIO_ARG_TYPES: ArgTypes<ItemRatioOptions> = {
  itemRatioX: {
    control: 'number',
  },
  itemRatioY: {
    control: 'number',
  },
};

export const GAP_ARG_TYPES: ArgTypes<GapOptions> = {
  gap: {
    control: 'text',
  },
  gapX: {
    control: 'text',
  },
  gapY: {
    control: 'text',
  },
};

export const CHILD_COUNT_ARG_TYPES: ArgTypes<ItemCountOptions> = {
  itemCountX: {
    control: 'text',
  },
  itemCountY: {
    control: 'text',
  },
};

export const CHILD_ARG_TYPES: ArgTypes<TracksOptions> = {
  tracksX: {
    control: 'text',
  },
  tracksY: {
    control: 'text',
  },
};

export const DEBUG_ARG_TYPES: ArgTypes<DebugOptions> = {
  containerWidth: {
    control: 'text',
  },
  containerHeight: {
    control: 'text',
  },
  itemCount: {
    type: 'number',
  },
  sizeType: {
    control: 'select',
    options: ['none', 'rand', 'static'],
  },
  posType: {
    control: 'select',
    options: ['none', 'rand', 'static'],
  },
};

export const ARG_TYPES = {
  all: {
    ...LAYOUT_ARG_TYPES,
    ...DIRECTION_ARG_TYPES,
    ...ALIGN_ARG_TYPES,
    ...ADJUST_ARG_TYPES,
    ...GAP_ARG_TYPES,
    ...ITEM_SIZE_ARG_TYPES,
    ...CHILD_COUNT_ARG_TYPES,
    ...CHILD_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
  nosize: {
    ...LAYOUT_ARG_TYPES,
    ...DIRECTION_ARG_TYPES,
    ...ALIGN_ARG_TYPES,
    ...ADJUST_ARG_TYPES,
    ...GAP_ARG_TYPES,
    ...CHILD_COUNT_ARG_TYPES,
    ...CHILD_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
  balance: {
    ...DIRECTION_ARG_TYPES,
    ...ALIGN_ARG_TYPES,
    ...ADJUST_ARG_TYPES,
    ...GAP_ARG_TYPES,
    ...ITEM_SIZE_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
  flow: {
    ...DIRECTION_ARG_TYPES,
    ...ALIGN_ARG_TYPES,
    ...ADJUST_ARG_TYPES,
    ...ITEM_SIZE_ARG_TYPES,
    ...GAP_ARG_TYPES,
    ...CHILD_COUNT_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
  matrix: {
    ...DIRECTION_ARG_TYPES,
    ...ALIGN_ARG_TYPES,
    ...ADJUST_ARG_TYPES,
    ...GAP_ARG_TYPES,
    ...CHILD_ARG_TYPES,
    ...CHILD_COUNT_ARG_TYPES,
    ...ITEM_SIZE_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
  pack: {
    ...DIRECTION_ARG_TYPES,
    ...GAP_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
  pin: {
    ...ITEM_SIZE_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
  stack: {
    ...DIRECTION_ARG_TYPES,
    ...ALIGN_ARG_TYPES,
    ...ADJUST_ARG_TYPES,
    ...ITEM_SIZE_ARG_TYPES,
    ...GAP_ARG_TYPES,
    ...CHILD_COUNT_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
  tile: {
    ...DIRECTION_ARG_TYPES,
    ...ALIGN_ARG_TYPES,
    ...ADJUST_ARG_TYPES,
    ...GAP_ARG_TYPES,
    ...ITEM_SIZE_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
  center: {
    ...DIRECTION_ARG_TYPES,
    ...ADJUST_ARG_TYPES,
    ...GAP_ARG_TYPES,
    ...ITEM_SIZE_ARG_TYPES,
    ...ITEM_RATIO_ARG_TYPES,
    ...CHILD_COUNT_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
  layer: {
    ...ADJUST_ARG_TYPES,
    ...ITEM_SIZE_ARG_TYPES,
    ...ITEM_RATIO_ARG_TYPES,
    ...CHILD_COUNT_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
} as const;

export const DIRECTION_OPTIONS: DirectionOptions = {
  direction: 'x',
};

export const ALIGN_OPTIONS: AlignOptions = {
  alignX: 'left',
  alignY: 'top',
};

export const ADJUST_OPTIONS: AdjustOptions = {
  adjustX: 'none',
  adjustY: 'none',
};

export const CHILD_OPTIONS: TracksOptions = {
  tracksX: undefined,
  tracksY: undefined,
};

export const ITEM_COUNT_OPTIONS: ItemCountOptions = {
  itemCountX: '4' as any,
  itemCountY: '3' as any,
};

export const ITEM_SIZE_OPTIONS: ItemSizeOptions = {
  itemSizeX: '60',
  itemSizeY: '120',
};

export const ITEM_RATIO_OPTIONS: ItemRatioOptions = {
  itemRatioX: 2,
  itemRatioY: 2,
};

export const GAP_OPTIONS: GapOptions = {
  gap: '8',
  gapX: undefined,
  gapY: undefined,
};

export const DEBUG_PARAMS: DebugOptions = {
  containerWidth: '600',
  containerHeight: '450',
  itemCount: 12,
  sizeType: 'none',
  posType: 'none',
};

export const ARGS: Record<string, Record<string, any>> = {
  all: {
    ...LAYOUT_ARG_TYPES,
    ...DIRECTION_ARG_TYPES,
    ...ALIGN_ARG_TYPES,
    ...ADJUST_ARG_TYPES,
    ...GAP_ARG_TYPES,
    ...CHILD_OPTIONS,
    ...ITEM_SIZE_ARG_TYPES,
    ...CHILD_COUNT_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
  nosize: {
    ...LAYOUT_ARG_TYPES,
    ...DIRECTION_ARG_TYPES,
    ...ALIGN_ARG_TYPES,
    ...ADJUST_ARG_TYPES,
    ...GAP_ARG_TYPES,
    ...CHILD_COUNT_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
  balance: {
    ...DIRECTION_OPTIONS,
    ...ALIGN_OPTIONS,
    ...ADJUST_OPTIONS,
    ...ITEM_SIZE_OPTIONS,
    ...GAP_OPTIONS,
    ...DEBUG_PARAMS,
  },
  flow: {
    ...DIRECTION_OPTIONS,
    ...ALIGN_OPTIONS,
    ...ADJUST_OPTIONS,
    ...GAP_OPTIONS,
    ...ITEM_SIZE_OPTIONS,
    ...DEBUG_PARAMS,
  },
  matrix: {
    ...DIRECTION_OPTIONS,
    ...ALIGN_OPTIONS,
    ...ADJUST_OPTIONS,
    ...CHILD_OPTIONS,
    ...ITEM_SIZE_OPTIONS,
    ...ITEM_COUNT_OPTIONS,
    ...GAP_OPTIONS,
    ...DEBUG_PARAMS,
  },
  pin: {
    ...ITEM_SIZE_OPTIONS,
    ...DEBUG_PARAMS,
    posType: 'static',
  },
  pack: {
    ...DIRECTION_OPTIONS,
    ...GAP_OPTIONS,
    ...DEBUG_PARAMS,
  },
  stack: {
    ...DIRECTION_OPTIONS,
    ...ALIGN_OPTIONS,
    ...ADJUST_OPTIONS,
    ...GAP_OPTIONS,
    ...ITEM_SIZE_OPTIONS,
    ...DEBUG_PARAMS,
  },
  tile: {
    ...DIRECTION_OPTIONS,
    ...ALIGN_OPTIONS,
    ...ADJUST_OPTIONS,
    ...ITEM_SIZE_OPTIONS,
    ...GAP_OPTIONS,
    ...DEBUG_PARAMS,
  },
  center: {
    ...DIRECTION_OPTIONS,
    ...ADJUST_OPTIONS,
    ...GAP_OPTIONS,
    ...ITEM_SIZE_OPTIONS,
    ...ITEM_RATIO_OPTIONS,
    ...DEBUG_PARAMS,
  },
  layer: {
    ...ADJUST_OPTIONS,
    ...ITEM_SIZE_OPTIONS,
    ...ITEM_RATIO_OPTIONS,
    ...DEBUG_PARAMS,
  },
};

export const ENABLED_ARGS: Record<string, Record<string, any>> = {};
for (const layout in ARGS) {
  ENABLED_ARGS[layout] = {};
  for (const arg in ARGS[layout]) {
    ENABLED_ARGS[layout][arg] = true;
  }
}

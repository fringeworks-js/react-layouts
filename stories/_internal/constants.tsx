/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  BalanceLayoutOptions,
  FlowLayoutOptions,
  MatrixLayoutOptions,
  PackLayoutOptions,
  PinLayoutOptions,
  StackLayoutOptions,
  TileLayoutOptions,
} from '@niche-works/style-layouts';
import type { ArgTypes } from '@storybook/react-vite';
import { Adjust, AlignX, AlignY, Direction } from '../../src/constants';
import type { DebugOptions } from './types';

export const DIRECTION_ARG_OPTIONS = Object.values(Direction);

export const ALAGN_X_ARG_OPTIONS = Object.values(AlignX);

export const ALAGN_Y_ARG_OPTIONS = Object.values(AlignY);

export const ADJUST_ARG_OPTIONS = Object.values(Adjust);

export const DIRECTION_ARG_TYPES: ArgTypes = {
  direction: {
    control: 'select',
    options: DIRECTION_ARG_OPTIONS,
  },
};

export const ALIGN_ARG_TYPES: ArgTypes = {
  alignX: {
    control: 'select',
    options: ALAGN_X_ARG_OPTIONS,
  },
  alignY: {
    control: 'select',
    options: ALAGN_Y_ARG_OPTIONS,
  },
};

export const ADJUST_ARG_TYPES: ArgTypes = {
  adjustX: {
    control: 'select',
    options: ADJUST_ARG_OPTIONS,
  },
  adjustY: {
    control: 'select',
    options: ADJUST_ARG_OPTIONS,
  },
};

export const ADJUST_DIRECTION_X_ARG_TYPES: ArgTypes = {
  adjustX: {
    control: 'select',
    options: ADJUST_ARG_OPTIONS,
  },
  adjustY: {
    control: 'select',
    options: ['none'],
  },
};

export const ADJUST_DIRECTION_Y_ARG_TYPES: ArgTypes = {
  adjustX: {
    control: 'select',
    options: ['none'],
  },
  adjustY: {
    control: 'select',
    options: ADJUST_ARG_OPTIONS,
  },
};

export const CHILD_SIZE_ARG_TYPES: ArgTypes = {
  itemSizeX: {
    control: 'text',
  },
  itemSizeY: {
    control: 'text',
  },
};

export const SPACING_ARG_TYPES: ArgTypes = {
  spacing: {
    control: 'text',
  },
  spacingX: {
    control: 'text',
  },
  spacingY: {
    control: 'text',
  },
};

export const CHILD_COUNT_ARG_TYPES: ArgTypes = {
  itemCountX: {
    control: 'text',
  },
  itemCountY: {
    control: 'text',
  },
};

export const CHILD_ARG_TYPES: ArgTypes = {
  childX: {
    control: 'text',
  },
  childY: {
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
  balance: {
    ...DIRECTION_ARG_TYPES,
    ...ALIGN_ARG_TYPES,
    ...ADJUST_ARG_TYPES,
    ...SPACING_ARG_TYPES,
    ...CHILD_SIZE_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
  flow: {
    ...DIRECTION_ARG_TYPES,
    ...ALIGN_ARG_TYPES,
    ...ADJUST_ARG_TYPES,
    ...CHILD_SIZE_ARG_TYPES,
    ...SPACING_ARG_TYPES,
    ...CHILD_COUNT_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
  matrix: {
    ...DIRECTION_ARG_TYPES,
    ...ALIGN_ARG_TYPES,
    ...ADJUST_ARG_TYPES,
    ...SPACING_ARG_TYPES,
    ...CHILD_ARG_TYPES,
    ...CHILD_COUNT_ARG_TYPES,
    ...CHILD_SIZE_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
  pack: {
    ...DIRECTION_ARG_TYPES,
    ...SPACING_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
  pin: {
    ...CHILD_SIZE_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
  stack: {
    ...DIRECTION_ARG_TYPES,
    ...ALIGN_ARG_TYPES,
    ...ADJUST_ARG_TYPES,
    ...CHILD_SIZE_ARG_TYPES,
    ...SPACING_ARG_TYPES,
    ...CHILD_COUNT_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
  tile: {
    ...DIRECTION_ARG_TYPES,
    ...ALIGN_ARG_TYPES,
    ...ADJUST_ARG_TYPES,
    ...SPACING_ARG_TYPES,
    ...CHILD_SIZE_ARG_TYPES,
    ...DEBUG_ARG_TYPES,
  },
} as const;

export const DIRECTION_OPTIONS = {
  direction: 'x',
};

export const ALIGN_OPTIONS = {
  alignX: 'left',
  alignY: 'top',
};

export const ADJUST_OPTIONS = {
  adjustX: 'none',
  adjustY: 'none',
};

export const CHILD_OPTIONS = {
  childX: undefined,
  childY: undefined,
};

export const ITEM_COUNT_OPTIONS = {
  itemCountX: '4' as any,
  itemCountY: '3' as any,
};

export const ITEM_SIZE_OPTIONS = {
  itemSizeX: '60',
  itemSizeY: '120',
};

export const SPACING_OPTIONS = {
  spacing: '8',
  spacingX: undefined,
  spacingY: undefined,
};

export const DEBUG_PARAMS: DebugOptions = {
  containerWidth: '600',
  containerHeight: '450',
  itemCount: 12,
  sizeType: 'none',
  posType: 'none',
};

export const ARGS: Record<string, Record<string, any>> = {
  balance: {
    ...DIRECTION_OPTIONS,
    ...ALIGN_OPTIONS,
    ...ADJUST_OPTIONS,
    ...ITEM_SIZE_OPTIONS,
    ...SPACING_OPTIONS,
    ...DEBUG_PARAMS,
  } as BalanceLayoutOptions,
  flow: {
    ...DIRECTION_OPTIONS,
    ...ALIGN_OPTIONS,
    ...ADJUST_OPTIONS,
    ...SPACING_OPTIONS,
    ...ITEM_SIZE_OPTIONS,
    ...DEBUG_PARAMS,
  } as FlowLayoutOptions,
  matrix: {
    ...DIRECTION_OPTIONS,
    ...ALIGN_OPTIONS,
    ...ADJUST_OPTIONS,
    ...CHILD_OPTIONS,
    ...ITEM_SIZE_OPTIONS,
    ...ITEM_COUNT_OPTIONS,
    ...SPACING_OPTIONS,
    ...DEBUG_PARAMS,
  } as MatrixLayoutOptions,
  pack: {
    ...DIRECTION_OPTIONS,
    ...SPACING_OPTIONS,
    ...DEBUG_PARAMS,
  } as PackLayoutOptions,
  pin: {
    ...ITEM_SIZE_OPTIONS,
    ...DEBUG_PARAMS,
    posType: 'static',
  } as PinLayoutOptions,
  stack: {
    ...DIRECTION_OPTIONS,
    ...ALIGN_OPTIONS,
    ...ADJUST_OPTIONS,
    ...SPACING_OPTIONS,
    ...ITEM_SIZE_OPTIONS,
    ...DEBUG_PARAMS,
  } as StackLayoutOptions,
  tile: {
    ...DIRECTION_OPTIONS,
    ...ALIGN_OPTIONS,
    ...ADJUST_OPTIONS,
    ...ITEM_SIZE_OPTIONS,
    ...SPACING_OPTIONS,
    ...DEBUG_PARAMS,
  } as TileLayoutOptions,
};

export const ENABLED_ARGS: Record<string, Record<string, any>> = {};
for (const layout in ARGS) {
  ENABLED_ARGS[layout] = {};
  for (const arg in ARGS[layout]) {
    ENABLED_ARGS[layout][arg] = true;
  }
}

import type { ElementType } from 'react';
import type {
  LayoutComponentBase,
  WithLayoutBaseOptions,
} from '../_internal/withLayoutBase';
import { LayoutType as LAYOUT_TYPE } from '../constants';
import type { WithBalanceLayoutProps } from '../withBalanceLayout';
import type { WithCenterLayoutProps } from '../withCenterLayout';
import type { WithFlowLayoutProps } from '../withFlowLayout';
import type { WithLayerLayoutProps } from '../withLayerLayout';
import type { WithMatrixLayoutProps } from '../withMatrixLayout';
import type { WithPackLayoutProps } from '../withPackLayout';
import type { WithPinLayoutProps } from '../withPinLayout';
import type { WithStackLayoutProps } from '../withStackLayout';
import type { WithTileLayoutProps } from '../withTileLayout';

export type WithLayoutProps =
  | ({
      layout: typeof LAYOUT_TYPE.balance;
    } & WithBalanceLayoutProps)
  | ({
      layout: typeof LAYOUT_TYPE.center;
    } & WithCenterLayoutProps)
  | ({
      layout: typeof LAYOUT_TYPE.flow;
    } & WithFlowLayoutProps)
  | ({
      layout: typeof LAYOUT_TYPE.layer;
    } & WithLayerLayoutProps)
  | ({
      layout: typeof LAYOUT_TYPE.matrix;
    } & WithMatrixLayoutProps)
  | ({
      layout: typeof LAYOUT_TYPE.pack;
    } & WithPackLayoutProps)
  | ({
      layout: typeof LAYOUT_TYPE.pin;
    } & WithPinLayoutProps)
  | ({
      layout: typeof LAYOUT_TYPE.stack;
    } & WithStackLayoutProps)
  | ({
      layout: typeof LAYOUT_TYPE.tile;
    } & WithTileLayoutProps);

export type WithLayoutOptions = WithLayoutBaseOptions;

export type LayoutComponent<C extends ElementType> = LayoutComponentBase<
  C,
  WithLayoutProps
>;

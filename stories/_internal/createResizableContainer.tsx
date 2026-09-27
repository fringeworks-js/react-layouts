/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsxImportSource @emotion/react */
import { distribute } from '@niche-works/utils';
import { Resizable } from 're-resizable';
import { ComponentProps, ComponentType } from 'react';
import type { ResizableContainerProps } from './types';

const RESIZABLE_PROPS = [
  'as',
  'ref',
  'style',
  'className',
  'grid',
  'gridGap',
  'snap',
  'bounds',
  'boundsByDirection',
  'size',
  'defaultSize',
  'minWidth',
  'minHeight',
  'maxWidth',
  'maxHeight',
  'lockAspectRatio',
  'lockAspectRatioExtraWidth',
  'lockAspectRatioExtraHeight',
  'enable',
  'handleStyles',
  'handleClasses',
  'handleWrapperStyle',
  'handleWrapperClass',
  'onResizeStart',
  'onResize',
  'onResizeStop',
  'handleComponent',
  'scale',
  'resizeRatio',
  'snapGap',
] as const;

export default function createResizableContainer<C extends ComponentType>(
  Component: C,
) {
  type Props = Omit<ComponentProps<C>, keyof ResizableContainerProps> &
    ResizableContainerProps & {
      containerWidth?: string | number;
      containerHeight?: string | number;
      itemCount?: number;
      sizeType?: string;
      posType?: string;
    };
  return (props: Props) => {
    const { children, ...rest } = props;
    const { resizableProps, containerProps } = distribute(rest as any, {
      resizableProps: RESIZABLE_PROPS as any,
      containerProps: null,
    });

    return (
      <Resizable {...resizableProps}>
        <Component
          {...(containerProps as any)}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(128, 128, 128, 0.1)',
          }}
        >
          {children}
        </Component>
      </Resizable>
    );
  };
}

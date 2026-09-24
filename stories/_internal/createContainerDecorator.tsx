/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsxImportSource @emotion/react */
import type { Decorator } from '@storybook/react-vite';
import chroma from 'chroma-js';
import { useMemo } from 'react';
import Box from '../Box';
import toAttributesObj from './toAttributesObj';
import type { DebugOptions, ResizableContainerProps } from './types';

function _random(scale: number) {
  const value = Math.random();
  return Math.floor(value * scale);
}

export default function createContainerDecorator<
  O extends DebugOptions,
>(): Decorator<O & ResizableContainerProps> {
  return (Story, configs) => {
    const { args } = configs;
    const {
      containerWidth = 800,
      containerHeight = 600,
      itemCount = 12,
      sizeType = 'none',
      posType = 'none',
      ...rest
    } = toAttributesObj(args);
    const colors = chroma.scale(['d9ed92', '184e77']).colors(itemCount);
    const sizeStyles = useMemo(() => {
      const list = Array.from({ length: itemCount });
      if (sizeType === 'rand') {
        return list.map(() => ({
          height: _random(100),
          width: _random(200),
        }));
      } else if (sizeType === 'none') {
        return list.map(() => ({}));
      } else {
        return list.map(() => ({
          height: 120,
          width: 80,
        }));
      }
    }, [itemCount, sizeType]);
    const positionStyles = useMemo(() => {
      const list = Array.from({ length: itemCount });
      if (posType === 'rand') {
        return list.map(() => ({
          top: _random(600),
          left: _random(800),
        }));
      } else if (posType === 'none') {
        return list.map(() => ({}));
      } else {
        return list.map((item, index) => ({
          top: 40 * index,
          left: 40 * index,
        }));
      }
    }, [itemCount, posType]);

    return (
      <Story
        args={
          {
            ...rest,
            size: {
              height: containerHeight,
              width: containerWidth,
            },
            children: colors.map((color, index) => {
              const childProps = {
                style: toAttributesObj(
                  {
                    ...sizeStyles[index],
                    ...positionStyles[index],
                    backgroundColor: color,
                    color: 'rgba(0, 0, 0, 0.4)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                  },
                  { unit: true },
                ),
              };
              return (
                <Box key={index} {...(childProps as any)}>
                  {index + 1}
                </Box>
              );
            }),
          } as any
        }
      />
    );
  };
}

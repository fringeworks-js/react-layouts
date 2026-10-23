import type { StackItemOptions } from '@fringeworks/style-layouts/stack';
import type { ComponentProps, ComponentRef, ReactNode } from 'react';
import { describe, expectTypeOf, it } from 'vitest';
import withStackItem from './withStackItem';

/**
 * JSXが型として成立するかのみを検証するためのヘルパー
 */
const render = (node: ReactNode): ReactNode => node;

// 型引数を明示せずに生成する
const StackItemSpan = withStackItem('span');

type StackItemSpanProps = ComponentProps<typeof StackItemSpan>;

describe('withStackItem', () => {
  it('アイテムのオプションを`withLayoutBase`へ引き渡せている', () => {
    expectTypeOf<StackItemOptions>().toExtend<StackItemSpanProps>();
    render(<StackItemSpan adjustX="grow" sizeX={100} ratioX={1} id="item" />);
    render(<StackItemSpan />);
  });

  it('コンテナのオプション名は使えない', () => {
    // @ts-expect-error アイテムではitemSizeXではなくsizeX
    render(<StackItemSpan itemSizeX={100} />);
  });

  it('対象コンポーネントのプロパティとrefを引き継ぐ', () => {
    expectTypeOf<{ id: string }>().toExtend<StackItemSpanProps>();
    expectTypeOf<
      ComponentRef<typeof StackItemSpan>
    >().toEqualTypeOf<HTMLSpanElement>();
  });
});

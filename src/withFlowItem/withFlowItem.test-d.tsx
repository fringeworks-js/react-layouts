import type { FlowItemOptions } from '@fringeworks/style-layouts/flow';
import type { ComponentProps, ComponentRef, ReactNode } from 'react';
import { describe, expectTypeOf, it } from 'vitest';
import withFlowItem from './withFlowItem';

/**
 * JSXが型として成立するかのみを検証するためのヘルパー
 */
const render = (node: ReactNode): ReactNode => node;

// 型引数を明示せずに生成する
const FlowItemSpan = withFlowItem('span');

type FlowItemSpanProps = ComponentProps<typeof FlowItemSpan>;

describe('withFlowItem', () => {
  it('アイテムのオプションを`withLayoutBase`へ引き渡せている', () => {
    expectTypeOf<FlowItemOptions>().toExtend<FlowItemSpanProps>();
    render(<FlowItemSpan adjustX="fit" sizeY={40} id="item" />);
    render(<FlowItemSpan />);
  });

  it('コンテナのオプション名は使えない', () => {
    // @ts-expect-error アイテムではitemSizeXではなくsizeX
    render(<FlowItemSpan itemSizeX={100} />);
  });

  it('対象コンポーネントのプロパティとrefを引き継ぐ', () => {
    expectTypeOf<{ id: string }>().toExtend<FlowItemSpanProps>();
    expectTypeOf<
      ComponentRef<typeof FlowItemSpan>
    >().toEqualTypeOf<HTMLSpanElement>();
  });
});

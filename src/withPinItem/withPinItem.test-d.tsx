import type { PinItemOptions } from '@fringeworks/style-layouts/pin';
import type { ComponentProps, ComponentRef, ReactNode } from 'react';
import { describe, expectTypeOf, it } from 'vitest';
import withPinItem from './withPinItem';

/**
 * JSXが型として成立するかのみを検証するためのヘルパー
 */
const render = (node: ReactNode): ReactNode => node;

// 型引数を明示せずに生成する
const PinItemSpan = withPinItem('span');

type PinItemSpanProps = ComponentProps<typeof PinItemSpan>;

describe('withPinItem', () => {
  it('アイテムのオプションを`withLayoutBase`へ引き渡せている', () => {
    expectTypeOf<PinItemOptions>().toExtend<PinItemSpanProps>();
    render(
      <PinItemSpan
        alignX="right"
        offsetX={20}
        offsetY="10%"
        offsetZ={1}
        id="item"
      />,
    );
    render(<PinItemSpan />);
  });

  it('コンテナのオプション名は使えない', () => {
    // @ts-expect-error アイテムではitemSizeXではなくsizeX
    render(<PinItemSpan itemSizeX={100} />);
  });

  it('対象コンポーネントのプロパティとrefを引き継ぐ', () => {
    expectTypeOf<{ id: string }>().toExtend<PinItemSpanProps>();
    expectTypeOf<
      ComponentRef<typeof PinItemSpan>
    >().toEqualTypeOf<HTMLSpanElement>();
  });
});

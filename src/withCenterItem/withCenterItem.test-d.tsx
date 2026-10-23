import type { CenterItemOptions } from '@fringeworks/style-layouts/center';
import type { ComponentProps, ComponentRef, ReactNode } from 'react';
import { describe, expectTypeOf, it } from 'vitest';
import withCenterItem from './withCenterItem';

/**
 * JSXが型として成立するかのみを検証するためのヘルパー
 */
const render = (node: ReactNode): ReactNode => node;

// 型引数を明示せずに生成する
const CenterItemSpan = withCenterItem('span');

type CenterItemSpanProps = ComponentProps<typeof CenterItemSpan>;

describe('withCenterItem', () => {
  it('アイテムのオプションを`withLayoutBase`へ引き渡せている', () => {
    expectTypeOf<CenterItemOptions>().toExtend<CenterItemSpanProps>();
    render(<CenterItemSpan adjustY="shrink" sizeX={100} id="item" />);
    render(<CenterItemSpan />);
  });

  it('コンテナのオプション名は使えない', () => {
    // @ts-expect-error アイテムではitemSizeXではなくsizeX
    render(<CenterItemSpan itemSizeX={100} />);
  });

  it('対象コンポーネントのプロパティとrefを引き継ぐ', () => {
    expectTypeOf<{ id: string }>().toExtend<CenterItemSpanProps>();
    expectTypeOf<
      ComponentRef<typeof CenterItemSpan>
    >().toEqualTypeOf<HTMLSpanElement>();
  });
});

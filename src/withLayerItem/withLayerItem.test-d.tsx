import type { LayerItemOptions } from '@fringeworks/style-layouts/layer';
import type { ComponentProps, ComponentRef, ReactNode } from 'react';
import { describe, expectTypeOf, it } from 'vitest';
import withLayerItem from './withLayerItem';

/**
 * JSXが型として成立するかのみを検証するためのヘルパー
 */
const render = (node: ReactNode): ReactNode => node;

// 型引数を明示せずに生成する
const LayerItemSpan = withLayerItem('span');

type LayerItemSpanProps = ComponentProps<typeof LayerItemSpan>;

describe('withLayerItem', () => {
  it('アイテムのオプションを`withLayoutBase`へ引き渡せている', () => {
    expectTypeOf<LayerItemOptions>().toExtend<LayerItemSpanProps>();
    render(
      <LayerItemSpan alignX="right" adjustY="fit" offsetZ={1} id="item" />,
    );
    render(<LayerItemSpan />);
  });

  it('コンテナのオプション名は使えない', () => {
    // @ts-expect-error アイテムではitemSizeXではなくsizeX
    render(<LayerItemSpan itemSizeX={100} />);
  });

  it('対象コンポーネントのプロパティとrefを引き継ぐ', () => {
    expectTypeOf<{ id: string }>().toExtend<LayerItemSpanProps>();
    expectTypeOf<
      ComponentRef<typeof LayerItemSpan>
    >().toEqualTypeOf<HTMLSpanElement>();
  });
});

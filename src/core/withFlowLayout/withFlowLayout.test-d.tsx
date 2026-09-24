import type { FlowLayoutOptions } from '@niche-works/style-layouts/flow';
import type { ComponentProps, ComponentRef, ReactNode } from 'react';
import { describe, expectTypeOf, it } from 'vitest';
import { LAYOUT_PROPS_KEYS } from '../_internal/withLayoutBase/_constants';
import type { AllKeys } from '../_internal/withLayoutBase/types';
import withFlowLayout from './withFlowLayout';

/**
 * JSXが型として成立するかのみを検証するためのヘルパー
 */
const render = (node: ReactNode): ReactNode => node;

// 型引数を明示せずに生成する
const FlowDiv = withFlowLayout('div');

type FlowDivProps = ComponentProps<typeof FlowDiv>;

describe('withFlowLayout', () => {
  it('レイアウトのオプションを`withLayoutBase`へ引き渡せている', () => {
    expectTypeOf<FlowLayoutOptions>().toExtend<FlowDivProps>();
    expectTypeOf<{ gap: number; itemSizeX: number }>().toExtend<FlowDivProps>();
    render(<FlowDiv direction="x" gap={8} scroll id="container" />);
    // @ts-expect-error 未知のプロパティは受け付けない
    render(<FlowDiv typoProp={1} />);
  });

  it('対象コンポーネントのプロパティとrefを引き継ぐ', () => {
    expectTypeOf<{ id: string }>().toExtend<FlowDivProps>();
    expectTypeOf<
      ComponentRef<typeof FlowDiv>
    >().toEqualTypeOf<HTMLDivElement>();
  });

  it('ユニオンで表現されたオプションの制約が保たれる', () => {
    // `direction='x'`のとき`adjustY`は`none`のみ
    expectTypeOf<{
      direction: 'x';
      adjustY: 'none';
    }>().toExtend<FlowDivProps>();
    expectTypeOf<{
      direction: 'x';
      adjustY: 'grow';
    }>().not.toExtend<FlowDivProps>();
    // `direction='y'`のとき`adjustX`は`none`のみ
    expectTypeOf<{
      direction: 'y';
      adjustX: 'grow';
    }>().not.toExtend<FlowDivProps>();
    // `direction`に対応する軸は制約を受けない
    expectTypeOf<{
      direction: 'x';
      adjustX: 'grow';
    }>().toExtend<FlowDivProps>();
  });

  it('レイアウトのオプションは`LAYOUT_PROPS_KEYS`で網羅されている', () => {
    // 網羅されていないとコンテナーへそのまま渡ってしまうため
    expectTypeOf<AllKeys<FlowLayoutOptions>>().toExtend<
      keyof typeof LAYOUT_PROPS_KEYS
    >();
  });
});

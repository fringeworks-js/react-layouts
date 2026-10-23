import type { ComponentRef, ReactNode } from 'react';
import { describe, expectTypeOf, it } from 'vitest';
import withLayout from './withLayout';

/**
 * JSXが型として成立するかのみを検証するためのヘルパー
 */
const render = (node: ReactNode): ReactNode => node;

const Layout = withLayout('div');

describe('withLayout', () => {
  it('layoutに応じたプロパティを指定できる', () => {
    render(<Layout layout="stack" direction="y" gap={8} id="layout" />);
    render(<Layout layout="matrix" itemCountX={3} tracksY={[1, 2]} />);
    render(<Layout layout="pin" itemOffsetX={20} alignY="bottom" />);
    render(<Layout layout="pack" scroll className="custom" />);
  });

  it('layoutは必須で、LayoutType以外は指定できない', () => {
    // @ts-expect-error layoutの指定が無い
    render(<Layout gap={8} />);
    // @ts-expect-error LayoutType以外の値
    render(<Layout layout="grid" />);
  });

  it('選んだレイアウトに無いプロパティは指定できない', () => {
    // @ts-expect-error packにalignXは無い
    render(<Layout layout="pack" alignX="right" />);
    // @ts-expect-error stackにitemCountXは無い
    render(<Layout layout="stack" itemCountX={3} />);
  });

  it('選んだレイアウトのオプションの制約が保たれる', () => {
    // @ts-expect-error matrixはitemCountYかtracksYが必須
    render(<Layout layout="matrix" itemCountX={3} />);
    // @ts-expect-error direction='y'のflowでadjustXにgrowは指定できない
    render(<Layout layout="flow" direction="y" adjustX="grow" />);
  });

  it('refは対象のコンポーネントから導出される', () => {
    expectTypeOf<ComponentRef<typeof Layout>>().toEqualTypeOf<HTMLDivElement>();
  });
});

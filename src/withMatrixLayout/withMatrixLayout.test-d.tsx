import type { ReactNode } from 'react';
import { describe, it } from 'vitest';
import withMatrixLayout from './withMatrixLayout';

/**
 * JSXが型として成立するかのみを検証するためのヘルパー
 */
const render = (node: ReactNode): ReactNode => node;

const Matrix = withMatrixLayout('div');

describe('withMatrixLayout', () => {
  it('各軸でitemCountかtracksのどちらかを指定する', () => {
    render(<Matrix itemCountX={3} itemCountY={2} />);
    render(<Matrix tracksX={['1fr', 100]} itemCountY={2} itemSizeY={40} />);
    render(<Matrix itemCountX={3} tracksY={[1, 2]} id="matrix" />);
  });

  it('itemCountもtracksも指定しない軸があると型エラーになる', () => {
    // @ts-expect-error 両方の軸の指定が無い
    render(<Matrix />);
    // @ts-expect-error 縦軸の指定が無い
    render(<Matrix itemCountX={3} />);
  });

  it('同じ軸にitemCountとtracksの両方は指定できない', () => {
    // @ts-expect-error 横軸にitemCountXとtracksXの両方を指定している
    render(<Matrix itemCountX={3} tracksX={[1]} itemCountY={2} />);
  });

  it('itemSizeはtracksと組み合わせられない', () => {
    // @ts-expect-error itemSizeXはitemCountXと組み合わせる
    render(<Matrix tracksX={[1]} itemSizeX={100} itemCountY={2} />);
  });
});

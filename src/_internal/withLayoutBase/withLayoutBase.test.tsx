import type { LooseDictionary } from '@fringeworks/types';
import { createRef, forwardRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import withLayout from '../../withLayout';
import withStackItem from '../../withStackItem';
import withStackLayout from '../../withStackLayout';

/**
 * 受け取ったプロパティ（refを除く）をJSONで出力するコンポーネント
 */
const Probe = ({ ref: _ref, ...props }: LooseDictionary) => (
  <pre>{JSON.stringify(props)}</pre>
);

/**
 * Probeが受け取ったプロパティを取り出す
 */
const renderProps = (node: React.ReactNode): LooseDictionary =>
  JSON.parse(
    renderToStaticMarkup(node)
      .replace(/^<pre>|<\/pre>$/g, '')
      .replace(/&quot;/g, '"'),
  );

describe('withLayoutBase', () => {
  describe('プロパティの振り分け', () => {
    test('コンテナは、そのレイアウトのオプション以外をコンポーネントへ渡す', () => {
      const Stack = withStackLayout(Probe);
      const props = renderProps(
        <Stack gap={8} {...{ sizeX: 1, offsetX: 2, title: 'a' }} />,
      );
      expect(props).toMatchObject({ sizeX: 1, offsetX: 2, title: 'a' });
      expect(props).not.toHaveProperty('gap');
    });

    test('アイテムは、コンテナのオプションをコンポーネントへ渡す', () => {
      const StackItem = withStackItem(Probe);
      const props = renderProps(
        <StackItem sizeX={10} {...{ direction: 'y', gap: 8 }} />,
      );
      expect(props).toMatchObject({ direction: 'y', gap: 8 });
      expect(props).not.toHaveProperty('sizeX');
    });

    test('withLayoutは、layoutと選択したレイアウトのオプションだけを取り除く', () => {
      const Layout = withLayout(Probe);
      const props = renderProps(
        <Layout layout="pack" gap={8} {...{ alignX: 'right' }} />,
      );
      expect(props).toMatchObject({ alignX: 'right' });
      expect(props).not.toHaveProperty('layout');
      expect(props).not.toHaveProperty('gap');
    });

    test('classNameは、HOCのオプション・プロパティ・レイアウトの順に結合する', () => {
      const Stack = withStackLayout(Probe, { className: 'static' });
      const props = renderProps(<Stack className="custom" />);
      expect(props['className']).toMatch(/^static custom frg-layout-stack /);
      expect(props).not.toHaveProperty('scroll');
    });
  });

  describe('スタイル', () => {
    const Stack = withStackLayout('div');

    test('レイアウトのCSS変数とユーザーのstyleをマージする', () => {
      expect(
        renderToStaticMarkup(<Stack gap={8} style={{ color: 'red' }} />),
      ).toContain(
        'style="--frg-layout-gapX:8px;--frg-layout-gapY:8px;color:red"',
      );
    });

    test('ユーザーの個別指定がscrollのoverflowより後に並ぶ', () => {
      expect(
        renderToStaticMarkup(<Stack scroll style={{ overflowY: 'hidden' }} />),
      ).toContain('overflow:auto;overflow-y:hidden');
    });

    test('ユーザーのstyleがレイアウトのスタイルより優先される', () => {
      const html = renderToStaticMarkup(
        <Stack
          gap={8}
          scroll
          style={{ overflow: 'hidden', '--frg-layout-gapX': '20px' } as never}
        />,
      );
      expect(html).toContain('overflow:hidden');
      expect(html).toContain('--frg-layout-gapX:20px');
      expect(html).toContain('--frg-layout-gapY:8px');
    });

    test('scrollを指定するとoverflow: autoを加える', () => {
      expect(renderToStaticMarkup(<Stack scroll />)).toContain('overflow:auto');
    });

    test('styleProp以外のstyleは、そのままコンポーネントへ渡す', () => {
      const SxStack = withStackLayout(Probe, { styleProp: 'sx' });
      const props = renderProps(
        <SxStack gap={8} style={{ margin: 1 }} {...{ sx: { color: 'red' } }} />,
      );
      expect(props['style']).toEqual({ margin: 1 });
      expect(props['sx']).toEqual({
        color: 'red',
        '--frg-layout-gapX': '8px',
        '--frg-layout-gapY': '8px',
      });
    });
  });
  describe('ref', () => {
    test('対象のコンポーネントへrefを渡す', () => {
      let received: unknown;
      const Target = (props: LooseDictionary) => {
        received = props['ref'];
        return null;
      };
      const Stack = withStackLayout(Target);
      const ref = createRef<unknown>();
      renderToStaticMarkup(<Stack ref={ref} />);
      expect(received).toBe(ref);
    });
  });

  describe('styleMergeMode', () => {
    test('appendを指定すると、レイアウトのスタイルとユーザーの指定を配列で結合する', () => {
      const SxStack = withStackLayout(Probe, {
        styleProp: 'sx',
        styleMergeMode: 'append',
      });
      const props = renderProps(
        <SxStack gap={8} {...{ sx: { color: 'red' } }} />,
      );
      // 後ろの要素が優先される（ユーザーの指定が末尾）
      expect(props['sx']).toEqual([
        { '--frg-layout-gapX': '8px', '--frg-layout-gapY': '8px' },
        { color: 'red' },
      ]);
    });
  });

  describe('displayName', () => {
    test('HOCの名前と対象のコンポーネントの名前から作る', () => {
      const Named = forwardRef<HTMLDivElement>(() => null);
      Named.displayName = 'Named';
      function Card() {
        return null;
      }
      expect(withStackLayout('div').displayName).toBe('withStackLayout(div)');
      expect(withStackItem(Named).displayName).toBe('withStackItem(Named)');
      expect(withLayout(Card).displayName).toBe('withLayout(Card)');
    });

    test('名前の無いコンポーネントはUnknownにする', () => {
      expect(withStackLayout(() => null).displayName).toBe(
        'withStackLayout(Unknown)',
      );
    });

    test('オプションで指定した値を優先する', () => {
      expect(
        withStackLayout('div', { displayName: 'MyStack' }).displayName,
      ).toBe('MyStack');
    });
  });
});

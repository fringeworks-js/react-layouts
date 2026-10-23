import balance from '@fringeworks/style-layouts/balance';
import center from '@fringeworks/style-layouts/center';
import flow from '@fringeworks/style-layouts/flow';
import layer from '@fringeworks/style-layouts/layer';
import matrix from '@fringeworks/style-layouts/matrix';
import pack from '@fringeworks/style-layouts/pack';
import pin from '@fringeworks/style-layouts/pin';
import stack from '@fringeworks/style-layouts/stack';
import tile from '@fringeworks/style-layouts/tile';
import type { LooseDictionary } from '@fringeworks/types';
import { unsafeCast } from '@fringeworks/utils';
import type { ElementType } from 'react';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import type { LayoutType } from '../constants';
import withBalanceLayout from '../withBalanceLayout';
import withCenterLayout from '../withCenterLayout';
import withFlowLayout from '../withFlowLayout';
import withLayerLayout from '../withLayerLayout';
import withMatrixLayout from '../withMatrixLayout';
import withPackLayout from '../withPackLayout';
import withPinLayout from '../withPinLayout';
import withStackLayout from '../withStackLayout';
import withTileLayout from '../withTileLayout';
import withLayout from './withLayout';

/**
 * レイアウト種別ごとの、レイアウト関数・専用のHOC・テストに使うオプション
 */
const CASES: Record<
  LayoutType,
  [
    layout: (options: never) => { className?: string },
    ElementType,
    LooseDictionary,
  ]
> = {
  balance: [balance, withBalanceLayout('div'), { adjustX: 'grow', gap: 8 }],
  center: [center, withCenterLayout('div'), { direction: 'y', itemSizeX: 10 }],
  flow: [flow, withFlowLayout('div'), { alignX: 'right', itemRatioX: 2 }],
  layer: [layer, withLayerLayout('div'), { alignY: 'bottom', itemOffsetZ: 1 }],
  matrix: [matrix, withMatrixLayout('div'), { itemCountX: 3, tracksY: [1, 2] }],
  pack: [pack, withPackLayout('div'), { direction: 'y', gapX: 4 }],
  pin: [pin, withPinLayout('div'), { alignX: 'right', itemOffsetX: 20 }],
  stack: [
    stack,
    withStackLayout('div'),
    { adjustY: 'fit', limitToItems: true },
  ],
  tile: [tile, withTileLayout('div'), { itemSizeX: 100, gapY: 2 }],
};

const Layout = unsafeCast<ElementType<LooseDictionary>>(withLayout('div'));

describe('withLayout', () => {
  describe.each(Object.entries(CASES))('%s', (type, [layout, Hoc, options]) => {
    const html = renderToStaticMarkup(
      createElement(Layout, { layout: type, id: 'a', ...options }),
    );

    test('専用のHOCと同じ結果になる', () => {
      expect(html).toBe(
        renderToStaticMarkup(createElement(Hoc, { id: 'a', ...options })),
      );
    });

    test('レイアウト関数のクラスを適用し、オプションはDOMへ渡さない', () => {
      const { className } = layout(unsafeCast<never>(options));
      expect(html).toContain(`class="${className}"`);
      for (const key of Object.keys(options)) {
        expect(html).not.toContain(`${key}=`);
      }
    });
  });

  test('layoutを切り替えると、適用するレイアウトが変わる', () => {
    const render = (type: LayoutType) =>
      renderToStaticMarkup(createElement(Layout, { layout: type }));
    expect(render('stack')).toContain('frg-layout-stack');
    expect(render('tile')).toContain('frg-layout-tile');
    expect(render('tile')).not.toContain('frg-layout-stack');
  });

  test.each([['unknown'], ['toString'], [undefined]])(
    'LayoutType以外のlayout（%s）では、レイアウトを適用せずに描画する',
    (type) => {
      expect(
        renderToStaticMarkup(
          createElement(Layout, {
            layout: type,
            className: 'custom',
            scroll: true,
            id: 'a',
          }),
        ),
      ).toBe('<div class="custom" id="a" style="overflow:auto"></div>');
    },
  );
});

import { layerItem } from '@fringeworks/style-layouts/layer';
import { renderToStaticMarkup } from 'react-dom/server';
import withLayerLayout from '../withLayerLayout';
import withStackLayout from './withStackLayout';

const StackDiv = withStackLayout('div');
const LayerDiv = withLayerLayout('div');

describe('withStackLayout', () => {
  test('コンテナのコンポーネントに*Item()の戻り値をclassName / styleとして渡す', () => {
    const html = renderToStaticMarkup(
      <LayerDiv>
        <StackDiv itemSizeX={50} {...layerItem({ sizeX: 200 })} />
      </LayerDiv>,
    );
    expect(html).toContain(
      'class="frg-layout-layer-item frg-layout-layer-item-sizeX frg-layout-stack',
    );
    expect(html).toContain('--frg-layout-layer-item-sizeX:200px');
    expect(html).toContain('--frg-layout-itemSizeX:50px');
  });

  test('limitToItemsを指定するとコンテナにクラスを追加する', () => {
    expect(renderToStaticMarkup(<StackDiv limitToItems />)).toContain(
      'frg-layout-limitToItems',
    );
  });
});

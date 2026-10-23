import { renderToStaticMarkup } from 'react-dom/server';
import withPinItem from './withPinItem';

const PinItemSpan = withPinItem('span');

describe('withPinItem', () => {
  test('位置の基準とオフセットを適用する', () => {
    const html = renderToStaticMarkup(
      <PinItemSpan alignX="right" offsetX={20} offsetY="10%" offsetZ={1} />,
    );
    expect(html).toBe(
      '<span class="frg-layout-pin-item frg-layout-pin-item-alignX frg-layout-pin-item-alignX-right frg-layout-pin-item-offsetX frg-layout-pin-item-offsetY frg-layout-pin-item-offsetZ" style="--frg-layout-pin-item-offsetX:20px;--frg-layout-pin-item-offsetY:10%;--frg-layout-pin-item-offsetZ:1"></span>',
    );
  });
});

import { renderToStaticMarkup } from 'react-dom/server';
import withPinItem from './withPinItem';

const PinItemSpan = withPinItem('span');

describe('withPinItem', () => {
  test('位置の基準とオフセットを適用する', () => {
    const html = renderToStaticMarkup(
      <PinItemSpan alignX="right" offsetX={20} offsetY="10%" offsetZ={1} />,
    );
    expect(html).toBe(
      '<span class="frgs-layout-pin-item frgs-layout-pin-item-alignX frgs-layout-pin-item-alignX-right frgs-layout-pin-item-offsetX frgs-layout-pin-item-offsetY frgs-layout-pin-item-offsetZ" style="--frgs-layout-pin-item-offsetX:20px;--frgs-layout-pin-item-offsetY:10%;--frgs-layout-pin-item-offsetZ:1"></span>',
    );
  });
});

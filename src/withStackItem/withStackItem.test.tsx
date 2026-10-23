import { renderToStaticMarkup } from 'react-dom/server';
import withStackItem from './withStackItem';

const StackItemSpan = withStackItem('span');

describe('withStackItem', () => {
  test('アイテムのクラスとCSS変数を適用し、オプションはDOMへ渡さない', () => {
    const html = renderToStaticMarkup(
      <StackItemSpan
        adjustX="grow"
        sizeX={100}
        ratioX={2}
        id="item"
        className="custom"
      />,
    );
    expect(html).toBe(
      '<span class="custom frg-layout-stack-item frg-layout-stack-item-adjustX frg-layout-stack-item-adjustX-grow frg-layout-stack-item-sizeX frg-layout-stack-item-ratio" id="item" style="--frg-layout-stack-item-sizeX:100px;--frg-layout-stack-item-ratio:2 / 1"></span>',
    );
  });

  test('オプションを省略するとアイテムのクラスだけを適用する', () => {
    expect(renderToStaticMarkup(<StackItemSpan />)).toBe(
      '<span class="frg-layout-stack-item"></span>',
    );
  });
});

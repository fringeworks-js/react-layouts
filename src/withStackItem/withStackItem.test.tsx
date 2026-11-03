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
      '<span class="custom frgs-layout-stack-item frgs-layout-stack-item-adjustX frgs-layout-stack-item-adjustX-grow frgs-layout-stack-item-sizeX frgs-layout-stack-item-ratio" id="item" style="--frgs-layout-stack-item-sizeX:100px;--frgs-layout-stack-item-ratio:2 / 1"></span>',
    );
  });

  test('オプションを省略するとアイテムのクラスだけを適用する', () => {
    expect(renderToStaticMarkup(<StackItemSpan />)).toBe(
      '<span class="frgs-layout-stack-item"></span>',
    );
  });
});

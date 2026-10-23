import type { CSSProperties } from 'react';
import createTestModel from '../_shared/createTestModel';
import type { LayoutName, TestStoryArgs } from '../_shared/types';
import LAYOUTS, { LAYOUT_ITEM_FUNCTIONS, LAYOUT_ITEMS } from './layouts';

export default function createTestRenderer(name: LayoutName) {
  const Component = LAYOUTS[name];
  const ItemComponent = LAYOUT_ITEMS[name];
  const createItem = LAYOUT_ITEM_FUNCTIONS[name];
  return (args: TestStoryArgs) => {
    const { options, containerStyle, items } = createTestModel(args);
    return (
      <Component {...options} style={containerStyle as CSSProperties}>
        {items.map(({ label, style, contentStyle, layout, itemOptions }) => {
          const content = (
            <>
              {label}
              {contentStyle && <div style={contentStyle as CSSProperties} />}
            </>
          );
          if (layout) {
            // 入れ子のレイアウト
            // アイテムを兼ねる場合は、*Item()の戻り値をclassName / styleとして渡す
            const ChildComponent = LAYOUTS[layout.name];
            const item = itemOptions && createItem?.(itemOptions);
            return (
              <ChildComponent
                key={label}
                {...layout.options}
                className={item?.className}
                style={{ ...style, ...item?.style } as CSSProperties}
              >
                {content}
              </ChildComponent>
            );
          }
          if (itemOptions && ItemComponent) {
            // アイテム
            return (
              <ItemComponent
                key={label}
                {...itemOptions}
                style={style as CSSProperties}
              >
                {content}
              </ItemComponent>
            );
          }
          return (
            <div key={label} style={style as CSSProperties}>
              {content}
            </div>
          );
        })}
      </Component>
    );
  };
}

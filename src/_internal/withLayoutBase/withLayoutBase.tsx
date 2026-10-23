import type { StyleProxyOptions } from '@fringeworks/react-style-proxy';
import { styleProxy } from '@fringeworks/react-style-proxy';
import ensureComponent from '@fringeworks/react-utils/utils/ensureComponent';
import getComponentName from '@fringeworks/react-utils/utils/getComponentName';
import type { LooseDictionary } from '@fringeworks/types';
import { unsafeCast } from '@fringeworks/utils';
import hasOwn from '@fringeworks/utils/object/hasOwn';
import clsx from 'clsx';
import type { ComponentRef, ElementType } from 'react';
import { createElement, forwardRef } from 'react';
import applyLayout from '../applyLayout';
import type {
  AnyLayoutDefinition,
  LayoutComponentBase,
  LayoutDefinition,
  LayoutSource,
  WithLayoutBaseOptions,
  WithLayoutProps,
} from './types';

/**
 * レイアウトを適用しない場合の組（マップに無い`layout`を指定された場合に使う）
 */
const NO_LAYOUT: AnyLayoutDefinition = [
  () => ({}),
  (props: LooseDictionary): [unknown, LooseDictionary] => [{}, props],
];

/**
 * レイアウト機能（コンテナ・子要素）を追加するHOC
 *
 * - レイアウトのオプションに当たるプロパティだけを取り除き、残りはコンポーネントへ渡す
 * - レイアウトのスタイルは`styleProp`のプロパティへ既定値としてマージする（ユーザーの指定が優先）
 * - レイアウトの組のマップに無い`layout`を指定した場合は、レイアウトを適用しない
 * @param hocName HOCの名前（displayNameの既定値に使う）
 * @param Component コンポーネント
 * @param layout 適用するレイアウト
 * @param options オプション
 * @returns
 */
export default function withLayoutBase<C extends ElementType, O extends object>(
  hocName: string,
  Component: C,
  layout: LayoutSource<O>,
  options: WithLayoutBaseOptions = {},
): LayoutComponentBase<C, O> {
  // 公開シグネチャは厳密に保ち、内部の型の辻褄合わせはここに閉じ込める
  const EnsuredComponent = ensureComponent(
    unsafeCast<ElementType<LooseDictionary>>(Component),
  );
  const {
    displayName = `${hocName}(${getComponentName(Component)})`,
    className: staticClassName,
    ...restOptions
  } = options;
  const styleProxyOptions: StyleProxyOptions = {
    styleAsDefault: true,
    ...restOptions,
  };

  const resolveLayout = isLayoutDefinition(layout)
    ? (props: LooseDictionary): [LayoutDefinition<O>, LooseDictionary] => {
        return [layout, props];
      }
    : (props: LooseDictionary): [LayoutDefinition<O>, LooseDictionary] => {
        const { layout: type, ...rest } = props;
        const definition =
          typeof type === 'string' && hasOwn(layout, type)
            ? layout[type]
            : undefined;
        // マップ内の各レイアウトのオプションの型は、呼び出し側の公開シグネチャで保証する
        return [unsafeCast<LayoutDefinition<O>>(definition ?? NO_LAYOUT), rest];
      };

  const LayoutComponent = forwardRef<ComponentRef<C>, WithLayoutProps<C, O>>(
    (props, ref) => {
      const { className, scroll, ...restProps } =
        unsafeCast<LooseDictionary>(props);
      const [[createLayoutStyle, extractOptions], unresolvedProps] =
        resolveLayout(restProps);
      const [layoutOptions, componentProps] = extractOptions(unresolvedProps);
      const layoutProps = applyLayout(
        createLayoutStyle,
        layoutOptions,
        Boolean(scroll),
      );
      return createElement(EnsuredComponent, {
        ref,
        className: clsx(staticClassName, className, layoutProps.className),
        ...styleProxy(componentProps, layoutProps.style, styleProxyOptions),
      });
    },
  );
  LayoutComponent.displayName = displayName;
  return LayoutComponent;
}

/**
 * レイアウトの組（静的）か、レイアウトの組のマップ（動的）かを判定する
 * @param layout 適用するレイアウト
 * @returns
 */
function isLayoutDefinition<O>(
  layout: LayoutSource<O>,
): layout is LayoutDefinition<O> {
  return Array.isArray(layout);
}

import { styleProxy } from '@niche-works/react-style-proxy';
import ensureComponent from '@niche-works/react-utils/utils/ensureComponent';
import type { CreateLayoutStyle } from '@niche-works/style-layouts';
import type { LooseDictionary } from '@niche-works/types';
import { unsafeCast } from '@niche-works/utils';
import clsx from 'clsx';
import type { ComponentRef, ElementType } from 'react';
import { createElement, forwardRef } from 'react';
import { LAYOUT_PROPS_KEYS } from '../_constants';
import type { ApplyLayoutOptions } from '../applyLayout';
import applyLayout from '../applyLayout';
import type {
  LayoutComponentBase,
  LayoutSource,
  WithLayoutBaseOptions,
  WithLayoutProps,
} from './types';

/**
 * コンテナーのレイアウト機能を追加するHOC
 * @param Component コンポーネント
 * @param layout 適用するレイアウト
 * @param options オプション
 * @returns
 */
export default function withLayoutBase<C extends ElementType, O extends object>(
  Component: C,
  layout: LayoutSource<O>,
  options: WithLayoutBaseOptions = {},
): LayoutComponentBase<C, O> {
  // 公開シグネチャは厳密に保ち、内部の型の辻褄合わせはここに閉じ込める
  const EnsuredComponent = ensureComponent(
    unsafeCast<ElementType<LooseDictionary>>(Component),
  );
  const name =
    EnsuredComponent.displayName ?? EnsuredComponent.name ?? 'Unknown';
  const {
    displayName = `withLayout(${name})`,
    className: staticClassName,
    ...styleProxyOptions
  } = options;

  const resolveLayout =
    typeof layout === 'function'
      ? (
          layout: LayoutSource<O>,
          props: LooseDictionary,
        ): [CreateLayoutStyle<O>, LooseDictionary] => {
          return [unsafeCast<CreateLayoutStyle<O>>(layout), props];
        }
      : (
          layout: LayoutSource<O>,
          props: LooseDictionary,
        ): [CreateLayoutStyle<O>, LooseDictionary] => {
          const { layout: type, ...rest } = props;
          // マップ内の各レイアウトのオプションの型は、呼び出し側の公開シグネチャで保証する
          return [unsafeCast<CreateLayoutStyle<O>>(layout[type]), rest];
        };

  const LayoutComponent = forwardRef<ComponentRef<C>, WithLayoutProps<C, O>>(
    (props, ref) => {
      const [createLayoutStyle, layoutOptions] = resolveLayout(layout, props);
      // propsは`O`を含むが、未解決の型引数`O`そのものとは同一視できないためキャストする
      const layoutProps = applyLayout(
        createLayoutStyle,
        unsafeCast<ApplyLayoutOptions<O>>(layoutOptions),
      );
      // レイアウト用のプロパティを削除
      const containerProps = { ...layoutOptions };
      for (const key in LAYOUT_PROPS_KEYS) {
        delete containerProps[key];
      }
      return createElement(EnsuredComponent, {
        ref,
        className: clsx(staticClassName, layoutProps.className),
        ...styleProxy(containerProps, layoutProps.style, styleProxyOptions),
      });
    },
  );
  LayoutComponent.displayName = displayName;
  return LayoutComponent;
}

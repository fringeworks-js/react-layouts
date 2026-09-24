import { styleProxy } from '@niche-works/react-style-proxy';
import ensureComponent from '@niche-works/react-utils/utils/ensureComponent';
import type { StyleLayout } from '@niche-works/style-layouts';
import type { LooseDictionary } from '@niche-works/types';
import { unsafeCast } from '@niche-works/utils';
import clsx from 'clsx';
import type { ComponentRef, ElementType } from 'react';
import { createElement, forwardRef } from 'react';
import applyLayout from '../applyLayout';
import { LAYOUT_PROPS_KEYS } from './_constants';
import type {
  LayoutComponent,
  WithLayoutBaseOptions,
  WithLayoutProps,
} from './types';

/**
 * コンテナーのレイアウト機能を追加するHOC
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withLayoutBase<C extends ElementType, O extends object>(
  Component: C,
  layout: StyleLayout<O>,
  options: WithLayoutBaseOptions = {},
): LayoutComponent<C, O> {
  type Props = WithLayoutProps<C, O>;

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

  const LayoutComponent = forwardRef<ComponentRef<C>, Props>((props, ref) => {
    const layoutProps = applyLayout(layout, props);
    // レイアウト用のプロパティを削除
    const containerProps: LooseDictionary = { ...props };
    for (const key in LAYOUT_PROPS_KEYS) {
      delete containerProps[key];
    }
    return createElement(EnsuredComponent, {
      ref,
      className: clsx(staticClassName, layoutProps.className),
      ...styleProxy(containerProps, layoutProps.style, styleProxyOptions),
    });
  });
  LayoutComponent.displayName = displayName;
  return LayoutComponent;
}

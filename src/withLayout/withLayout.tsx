import { styleProxy } from '@niche-works/react-style-proxy';
import ensureComponent from '@niche-works/react-utils/utils/ensureComponent';
import type { CreateLayoutStyle } from '@niche-works/style-layouts';
import balance from '@niche-works/style-layouts/balance';
import center from '@niche-works/style-layouts/center';
import flow from '@niche-works/style-layouts/flow';
import layer from '@niche-works/style-layouts/layer';
import matrix from '@niche-works/style-layouts/matrix';
import pack from '@niche-works/style-layouts/pack';
import pin from '@niche-works/style-layouts/pin';
import stack from '@niche-works/style-layouts/stack';
import tile from '@niche-works/style-layouts/tile';
import type { LooseDictionary } from '@niche-works/types';
import { unsafeCast } from '@niche-works/utils';
import clsx from 'clsx';
import type { ComponentRef, ElementType } from 'react';
import { createElement, forwardRef } from 'react';
import { LAYOUT_PROPS_KEYS } from '../_internal/_constants';
import type { ApplyLayoutOptions } from '../_internal/applyLayout';
import applyLayout from '../_internal/applyLayout';
import type {
  LayoutComponent,
  WithLayoutOptions,
  WithLayoutProps,
} from './types';

const LAYOUTS = {
  balance,
  center,
  flow,
  layer,
  matrix,
  pack,
  pin,
  stack,
  tile,
} as const;

/**
 * コンテナーのレイアウト機能を追加するHOC
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withLayout<C extends ElementType, O extends object>(
  Component: C,
  options: WithLayoutOptions = {},
): LayoutComponent<C> {
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

  const LayoutComponent = forwardRef<ComponentRef<C>, WithLayoutProps>(
    (props, ref) => {
      const { layout, ...rest } = props;
      // propsは`O`を含むが、未解決の型引数`O`そのものとは同一視できないためキャストする
      const layoutProps = applyLayout(
        unsafeCast<CreateLayoutStyle<O>>(LAYOUTS[layout]),
        unsafeCast<ApplyLayoutOptions<O>>(rest),
      );
      // レイアウト用のプロパティを削除
      const containerProps: LooseDictionary = { ...rest };
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
  // 内部で組み立てた型と公開シグネチャの型はTS上一致しないため、ここで辻褄を合わせる
  return unsafeCast<LayoutComponent<C>>(LayoutComponent);
}

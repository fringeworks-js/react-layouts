import { styleProxy } from '@niche-works/react-style-proxy';
import ensureComponent from '@niche-works/react-utils/utils/ensureComponent';
import type { StyleLayout } from '@niche-works/style-layouts';
import type { LooseDictionary } from '@niche-works/types';
import clsx from 'clsx';
import type {
  ElementType,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react';
import { createElement, forwardRef } from 'react';
import { LAYOUT_PROPS_KEYS } from './_constants';
import type { ApplyLayoutOptions } from '../applyLayout';
import applyLayout from '../applyLayout';
import type { ContainerComponentProps, WithLayoutBaseOptions } from './types';

/**
 * コンテナーのレイアウト機能を追加するHOC
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withLayoutBase<
  L extends LooseDictionary = LooseDictionary,
  P extends ContainerComponentProps = ContainerComponentProps,
  T = unknown,
>(
  Component: ElementType<P>,
  layout: StyleLayout,
  options: WithLayoutBaseOptions = {},
): ForwardRefExoticComponent<
  PropsWithoutRef<P & L & ApplyLayoutOptions> & RefAttributes<T>
> {
  const EnsuredComponent = ensureComponent(Component);
  const name = EnsuredComponent.displayName ?? 'unknown';
  const {
    displayName = `withLayout(${name})`,
    className: staticClassName,
    ...stypeProxyOptions
  } = options;
  /**
   * レイアウト機能を追加したコンテナー
   */
  const LayoutComponent = forwardRef<T, P & L & ApplyLayoutOptions>(
    (props, ref) => {
      const layoutProps = applyLayout(layout, props);
      // restからlayout用のプロパティを削除
      const containerPropsBase = { ...props };
      for (const key in LAYOUT_PROPS_KEYS) {
        delete containerPropsBase[key];
      }
      // コンテナーのスタイルにCSS変数の値を反映
      const containerProps = styleProxy<P>(
        containerPropsBase as unknown as P,
        layoutProps.style,
        stypeProxyOptions,
      );

      return createElement(EnsuredComponent, {
        ref,
        className: clsx(staticClassName, layoutProps.className),
        ...containerProps,
      });
    },
  );
  LayoutComponent.displayName = displayName;
  return LayoutComponent;
}

import { styleProxy } from '@niche-works/react-style-proxy';
import ensureComponent from '@niche-works/react/utils/ensureComponent';
import type { CreateLayout } from '@niche-works/style-layouts';
import clsx from 'clsx';
import type { ElementType } from 'react';
import { createElement, forwardRef } from 'react';
import { LAYOUT_PROPS_KEYS } from '../../_constants';
import applyLayout from '../applyLayout';
import type {
  ContainerComponentProps,
  WithLayoutBaseOptions,
  WithLayoutBaseProps,
} from './types';

/**
 * コンテナーのレイアウト機能を追加するHOC
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withLayoutBase<
  P extends ContainerComponentProps = ContainerComponentProps,
  T = unknown,
>(
  Component: ElementType<P>,
  layout: CreateLayout,
  options: WithLayoutBaseOptions = {},
) {
  const EnsuredComponent = ensureComponent(Component);
  const name = EnsuredComponent.displayName ?? 'unknown';
  const { displayName = `withLayout(${name})`, className: staticClassName } =
    options;
  /**
   * レイアウト機能を追加したコンテナー
   */
  const LayoutComponent = forwardRef<T, P & WithLayoutBaseProps>(
    (props, ref) => {
      const { className, ...rest } = props;
      const { className: clsNm, style: cssVariables } = applyLayout(
        layout,
        rest,
      );
      // restからlayout用のプロパティを削除
      const containerPropsBase = { ...rest };
      for (const key in LAYOUT_PROPS_KEYS) {
        delete containerPropsBase[key];
      }
      // コンテナーのスタイルにCSS変数の値を反映
      const containerProps = styleProxy<P>(
        containerPropsBase as unknown as P,
        cssVariables,
      );

      return createElement(EnsuredComponent, {
        ref,
        className: clsx(staticClassName, clsNm, className),
        ...containerProps,
      });
    },
  );
  LayoutComponent.displayName = displayName;
  return LayoutComponent;
}

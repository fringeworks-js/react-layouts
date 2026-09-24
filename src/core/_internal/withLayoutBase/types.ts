import type { StyleProxyOptions } from '@niche-works/react-style-proxy/styleProxy';
import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  CSSProperties,
  ElementType,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react';

/**
 * ユニオン型を分配して全てのキーを取り出す
 */
type AllKeys<T> = T extends unknown ? keyof T : never;

/**
 * レイアウト機能が消費する共通のプロパティ
 */
export type LayoutBaseProps = {
  /** クラス名 */
  className?: string;
  /** スタイル */
  style?: CSSProperties;
  /** スクロールの有無 */
  scroll?: boolean;
};

/**
 * HOCのオプション
 */
export type WithLayoutBaseOptions = StyleProxyOptions & {
  /** コンポーネントに設定するdisplayName */
  displayName?: string;
  /** クラス名 */
  className?: string;
};

/**
 * レイアウト機能を追加したコンポーネントのプロパティ
 */
export type WithLayoutProps<C extends ElementType, O> = Omit<
  ComponentPropsWithoutRef<C>,
  AllKeys<O> | keyof LayoutBaseProps
> &
  O &
  LayoutBaseProps;

/**
 * レイアウト機能を追加したコンポーネント
 */
export type LayoutComponent<
  C extends ElementType,
  O,
> = ForwardRefExoticComponent<
  PropsWithoutRef<WithLayoutProps<C, O>> & RefAttributes<ComponentRef<C>>
>;

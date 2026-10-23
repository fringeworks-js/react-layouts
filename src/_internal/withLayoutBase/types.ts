import type { StyleProxyOptions } from '@fringeworks/react-style-proxy/styleProxy';
import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  ElementType,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react';
import type {
  ExtractLayoutOptions,
  LayoutBaseProps,
  LayoutFunction,
} from '../applyLayout';

/**
 * ユニオン型を分配して全てのキーを取り出す
 *
 * `keyof`をユニオン型へそのまま適用すると共通のキーしか得られないため、
 * 分配してから取り出す
 */
export type AllKeys<T> = T extends unknown ? keyof T : never;

/**
 * レイアウトを作る関数と、プロパティからそのオプションを分ける関数の組
 *
 * - オプションの型はレイアウトを作る関数から推論する
 */
export type LayoutDefinition<O> = readonly [
  layout: LayoutFunction<O>,
  extractOptions: ExtractLayoutOptions<NoInfer<O>>,
];

/**
 * 適用するレイアウト
 *
 * - レイアウトの組: 常にそのレイアウトを適用する（静的）
 * - レイアウトの組のマップ: `layout`プロパティで選択したレイアウトを適用する（動的）
 */
export type LayoutSource<O> =
  LayoutDefinition<O> | Record<string, AnyLayoutDefinition>;

/**
 * 任意のオプションのレイアウトの組（レイアウトの組のマップの値）
 *
 * - オプションを受け取る側は`never`、返す側は`unknown`にして、どのレイアウトの組も受け付ける
 */
export type AnyLayoutDefinition = readonly [
  layout: LayoutFunction<never>,
  extractOptions: ExtractLayoutOptions<unknown>,
];

/**
 * HOCのオプション
 */
export type WithLayoutBaseOptions = Omit<
  StyleProxyOptions,
  'styleAsDefault'
> & {
  /**
   * コンポーネントに設定するdisplayName
   */
  displayName?: string;

  /**
   * クラス名
   */
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
export type LayoutComponentBase<
  C extends ElementType,
  O,
> = ForwardRefExoticComponent<
  PropsWithoutRef<WithLayoutProps<C, O>> & RefAttributes<ComponentRef<C>>
>;

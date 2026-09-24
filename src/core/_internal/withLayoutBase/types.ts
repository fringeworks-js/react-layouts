import type { StyleProxyOptions } from '@niche-works/react-style-proxy/styleProxy';
import type { StyleLayout } from '@niche-works/style-layouts';
import type { ReactNode } from 'react';
import type { ApplyLayoutOptions } from '../applyLayout';

export type WithLayoutBaseProps = ApplyLayoutOptions & {
  /**
   * レイアウト関数
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layout?: StyleLayout<any>;
};

export type WithLayoutBaseOptions = StyleProxyOptions & {
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
 * レイアウトを付与する対象のコンポーネントの最低限のプロパティ
 */
export type ContainerComponentProps = {
  /**
   * クラス名
   */
  className?: string;

  /**
   * 子要素
   */
  children?: ReactNode;
};

# @niche-works/react-layout

`@niche-works/react-layout` は、CSSによる子要素のレイアウト制御に特化したニッチなライブラリです。\
プロパティに応じたクラス名とCSS変数を自動的に設定するHOCを提供します。

**[English README is available here](./README.md)**

## インストール

```bash
npm install @niche-works/react-layout
# または
pnpm add @niche-works/react-layout
```

## 使い方

任意のコンポーネントをHOCに渡すことで、レイアウト機能の適用されたコンポーネントを作成することができます。

```ts
import { withStackLayout } from '@niche-works/react-layout';

// ※ classNameやstyle（CSS変数用）を透過するコンポーネントである必要があります
const MyContainer = (props: React.ComponentProps<'div'>) => <div {...props} />;

const StackContainer = withStackLayout(MyContainer);
```

```tsx
<StackContainer>
  <div>Item 1</div>
  <div>Item 2</div>
</StackContainer>
```

### CSSの読み込み

HOCはCSSをインポートしないため、SSRやReact Server Componentsでもそのまま使用できます。CSSは別途インポートしてください。

```ts
import { withStackLayout } from '@niche-works/react-layout';

// 全レイアウトをまとめてインポート
import '@niche-works/react-layout/styles.css';

// 必要なレイアウトのみインポート
import '@niche-works/react-layout/stack.css';
import '@niche-works/react-layout/tile.css';
```

CSSを自動的に読み込みたい場合は `with-css` 配下のモジュールを使用してください。CSSのインポートを扱えるバンドラーが必要です。

```ts
import { withStackLayout } from '@niche-works/react-layout/with-css';
```

## レイアウト種別

### `stack`

子要素を縦または横方向に一列に並べます。

```tsx
import { withStackLayout } from '@niche-works/react-layout';

const StackContainer = withStackLayout(Container);

// ----------------------

<StackContainer
  direction="x"
  alignX="left"
  alignY="top"
  adjustX="grow"
  itemSizeX="200px"
  spacing="8px"
/>;
```

### `flow`

`stack`と同様ですが、コンテナサイズを超えた場合に子要素を折り返します。

```tsx
import { withFlowLayout } from '@niche-works/react-layout';

const FlowContainer = withFlowLayout(Container);

// ----------------------

<FlowContainer
  direction="x"
  alignX="left"
  alignY="top"
  adjustX="grow"
  itemSizeX="200px"
  spacing="8px"
/>;
```

> 交差軸方向の `adjust` に `grow`、`shrink`、`fit` は指定できません。

### `matrix`

列数・行数を指定して子要素を格子状に並べます。

```tsx
import { withMatrixLayout } from '@niche-works/react-layout';

const MatrixContainer = withMatrixLayout(Container);

// ----------------------

<MatrixContainer
  direction="x"
  itemCountX={3}
  childY={[200, 100, '1fr']}
  itemSizeX="200px"
  adjustX="fit"
  spacing="8px"
/>;
```

各軸で `itemCount` または `child` のどちらか一方が必須です（両方は指定不可）。

> **注意:** このレイアウトはコンテナのサイズが外部から確定していることを前提としています。`width: max-content` など、子要素によってサイズが決まる親要素では、パーセンテージ値が意図通りに動作しない場合があります。

### `tile`

子要素のサイズを基準にして格子状に並べます。列数は親要素のサイズと子要素のサイズに応じて自動で決まります。

```tsx
import { withTileLayout } from '@niche-works/react-layout';

const TileContainer = withTileLayout(Container);

// ----------------------

<TileContainer direction="x" itemSizeX="200px" adjustX="fit" spacing="8px" />;
```

> **注意:** `matrix` と同様に、コンテナのサイズが外部から確定していることを前提としています。

### `balance`

子要素を一列に均等に並べます。

- `adjust` なし: 子要素のサイズを維持したまま、余白を均等に配分します
- `adjust` あり: 子要素のサイズを調整してコンテナを満たします

```tsx
import { withBalanceLayout } from '@niche-works/react-layout';

const BalanceContainer = withBalanceLayout(Container);

// ----------------------

<BalanceContainer
  direction="x"
  adjustX="grow"
  itemSizeX="200px"
  spacing="8px"
/>;
```

### `pack`

子要素を親要素のサイズに合わせて均等にサイズ調整し並べます。

```tsx
import { withPackLayout } from '@niche-works/react-layout';

const PackContainer = withPackLayout(Container);

// ----------------------

<PackContainer direction="x" spacing="8px" />;
```

### `pin`

子要素を指定の座標に配置します。子要素は `top` / `left` / `bottom` / `right` スタイルで位置を指定してください。

```tsx
import { withPinLayout } from '@niche-works/react-layout';

const PinContainer = withPinLayout(Container);

// ----------------------

<PinContainer itemSizeX="100px" itemSizeY="80px" />;
```

## オプション

### オプション一覧

| オプション    | 型                       | 説明                         |
| ------------- | ------------------------ | ---------------------------- |
| `direction?`  | `'x' \| 'y'`             | 主軸の方向                   |
| `alignX?`     | [`AlignX`](#alignx-の値) | 子要素の横位置               |
| `alignY?`     | [`AlignY`](#aligny-の値) | 子要素の縦位置               |
| `adjustX?`    | [`Adjust`](#adjust-の値) | 子要素の横方向のサイズ調整   |
| `adjustY?`    | [`Adjust`](#adjust-の値) | 子要素の縦方向のサイズ調整   |
| `spacing?`    | `string \| number`       | 子要素間の余白（横縦共通）   |
| `spacingX?`   | `string \| number`       | 子要素間の余白（横方向）     |
| `spacingY?`   | `string \| number`       | 子要素間の余白（縦方向）     |
| `itemSizeX?`  | `string \| number`       | 子要素の幅                   |
| `itemSizeY?`  | `string \| number`       | 子要素の高さ                 |
| `itemCountX?` | `number`                 | 子要素の横方向の数           |
| `itemCountY?` | `number`                 | 子要素の縦方向の数           |
| `tracksX?`    | `(string \| number)[]`   | 子要素の横方向の個々のサイズ |
| `tracksY?`    | `(string \| number)[]`   | 子要素の縦方向の個々のサイズ |

### `Adjust` の値

| 値       | 子が親より小さい時 | 子が親より大きい時 |
| -------- | ------------------ | ------------------ |
| `none`   | そのまま           | そのまま           |
| `grow`   | 伸びる             | そのまま           |
| `shrink` | そのまま           | 縮む               |
| `fit`    | 伸びる             | 縮む               |

### `AlignX` の値

`'left'` | `'center'` | `'right'` | `'space-between'` | `'space-around'` | `'space-evenly'`

### `AlignY` の値

`'top'` | `'middle'` | `'bottom'` | `'space-between'` | `'space-around'` | `'space-evenly'`

## ライセンス

MIT

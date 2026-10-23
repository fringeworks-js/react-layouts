# @fringeworks/react-layouts

`@fringeworks/react-layouts` は、CSSによる子要素のレイアウト制御に特化した、誰かにとっては便利なライブラリです。\
プロパティに応じたクラス名とCSS変数を自動的に設定するHOCを提供します。[`@fringeworks/style-layouts`](https://github.com/fringeworks-js/style-layouts) のReact版です。

**[English README is available here](./README.md)**

## インストール

```bash
npm install @fringeworks/react-layouts
# または
pnpm add @fringeworks/react-layouts
```

## 使い方

任意のコンポーネントをHOCに渡すことで、レイアウト機能の適用されたコンポーネントを作成することができます。

```tsx
import { withStackLayout } from '@fringeworks/react-layouts';

// ※ classNameやstyle（CSS変数用）を透過するコンポーネントである必要があります
const MyContainer = (props: React.ComponentProps<'div'>) => <div {...props} />;

const StackContainer = withStackLayout(MyContainer);

<StackContainer direction="x" gap={8}>
  <div>Item 1</div>
  <div>Item 2</div>
</StackContainer>;
```

HTMLの要素名（`'div'` など）もそのまま渡せます。レイアウトのプロパティはコンポーネントには渡されず、クラス名とCSS変数（`className` / `style`）として適用されます。それ以外のプロパティは、そのままコンポーネントに渡されます。

### CSSの読み込み

HOCはCSSをインポートしないため、SSRやReact Server Componentsでもそのまま使用できます。CSSは別途インポートしてください。

```ts
import { withStackLayout } from '@fringeworks/react-layouts';

// 全レイアウトをまとめてインポート
import '@fringeworks/react-layouts/styles.css';

// 必要なレイアウトのみインポート
import '@fringeworks/react-layouts/stack.css';
import '@fringeworks/react-layouts/tile.css';
```

CSSを自動的に読み込みたい場合は `with-css` 配下のモジュールを使用してください。CSSのインポートを扱えるバンドラーが必要です。

```ts
import { withStackLayout } from '@fringeworks/react-layouts/with-css';
```

### 子要素ごとの指定（`with*Item`）

コンテナに指定したプロパティは、全ての子要素に適用されます。特定の子要素だけ指定を変えたい場合は、`with*Item` で作ったコンポーネントを子要素に使います。指定したプロパティだけが、コンテナの指定を上書きします。

| HOC              | 対応するコンテナ   |
| ---------------- | ------------------ |
| `withStackItem`  | `withStackLayout`  |
| `withFlowItem`   | `withFlowLayout`   |
| `withCenterItem` | `withCenterLayout` |
| `withLayerItem`  | `withLayerLayout`  |
| `withPinItem`    | `withPinLayout`    |

```tsx
import { withStackItem, withStackLayout } from '@fringeworks/react-layouts';

const Stack = withStackLayout('div');
const StackItem = withStackItem('div');

<Stack direction="x" itemSizeX={100}>
  <div>幅100px</div>
  <StackItem adjustX="grow">残りの幅を埋める</StackItem>
</Stack>;
```

コンテナに `limitToItems` を指定すると、`with*Item` のコンポーネントの子要素だけがレイアウトの対象になります。

アイテムのプロパティでは、サイズと縦横比の名前に `item` を付けません（コンテナの `itemSizeX` に対して、アイテムは `sizeX`）。詳細は [`@fringeworks/style-layouts` のREADME](https://github.com/fringeworks-js/style-layouts/blob/main/README.ja.md) の「子要素ごとの指定（`*Item`）」を参照してください（`*Item()` のオプションがそのままプロパティになります）。

#### コンテナとアイテムを兼ねる子要素

`with*Layout` と `with*Item` のHOCは重ねられません（同じ名前のプロパティを区別できないため）。子要素がコンテナとアイテムを兼ねる場合は、`@fringeworks/style-layouts` の `*Item()` の戻り値を `className` / `style` としてコンテナのコンポーネントに渡してください。`@fringeworks/style-layouts` を直接読み込むため、依存に追加してください。

```tsx
import { layerItem } from '@fringeworks/style-layouts/layer';

const Layer = withLayerLayout('div');

<Layer>
  {/* 自身は layer のアイテム（幅200px）、子要素は stack で並べる */}
  <Stack itemSizeX={50} {...layerItem({ sizeX: 200 })}>
    ...
  </Stack>
</Layer>;
```

## レイアウト種別

各レイアウトの詳しい動作は、[`@fringeworks/style-layouts` のREADME](https://github.com/fringeworks-js/style-layouts/blob/main/README.ja.md) を参照してください。

### `stack`

子要素を縦または横方向に一列に並べます。

```tsx
import { withStackLayout } from '@fringeworks/react-layouts';

const Stack = withStackLayout('div');

<Stack
  direction="x"
  alignX="left"
  alignY="top"
  adjustX="grow"
  itemSizeX={200}
  gap={8}
/>;
```

### `flow`

`stack`と同様ですが、コンテナサイズを超えた場合に子要素を折り返します。

> 交差軸方向の `adjustX` / `adjustY` に `grow`、`shrink`、`fit` は指定できません。

```tsx
import { withFlowLayout } from '@fringeworks/react-layouts';

const Flow = withFlowLayout('div');

<Flow
  direction="x"
  alignX="left"
  alignY="top"
  adjustX="fit"
  itemSizeX={200}
  gap={8}
/>;
```

### `tile`

子要素のサイズを基準にして格子状に並べます。列数は親要素のサイズと子要素のサイズに応じて自動で決まります。

> **注意:** このレイアウトはコンテナのサイズが外部から確定していることを前提としています。`width: max-content` など、子要素によってサイズが決まる親要素では、パーセンテージ値が意図通りに動作しない場合があります。

```tsx
import { withTileLayout } from '@fringeworks/react-layouts';

const Tile = withTileLayout('div');

<Tile direction="x" adjustX="fit" itemSizeX={200} gap={8} />;
```

### `matrix`

列数・行数を指定して子要素を格子状に並べます。

各軸で `itemCount` または `tracks` のどちらか一方が必須です（両方は指定不可）。`itemSize` は `itemCount` と組み合わせて指定します。

> **注意:** `tile` と同様に、コンテナのサイズが外部から確定していることを前提としています。

```tsx
import { withMatrixLayout } from '@fringeworks/react-layouts';

const Matrix = withMatrixLayout('div');

<Matrix
  direction="x"
  adjustX="fit"
  itemSizeX={200}
  itemCountX={3}
  itemCountY={2}
  gap={8}
/>;

// グリッドトラックを直接指定する場合
<Matrix tracksX={['1fr', '2fr', '1fr']} itemCountY={3} />;
```

### `center`

子要素を親要素の中央に配置します。\
親要素が子要素より小さくなった場合でも、先頭の子要素が親要素の外にはみ出さずに表示されます。

```tsx
import { withCenterLayout } from '@fringeworks/react-layouts';

const Center = withCenterLayout('div');

<Center
  direction="x"
  adjustX="shrink"
  itemSizeY={200}
  itemRatioX={1.6}
  gap={8}
/>;
```

### `pack`

子要素を親要素のサイズに合わせて均等にサイズ調整し並べます。

```tsx
import { withPackLayout } from '@fringeworks/react-layouts';

const Pack = withPackLayout('div');

<Pack direction="x" gap={8} />;
```

### `balance`

子要素を一列に均等に並べます。

- `adjust` なし: 子要素のサイズを維持したまま、余白を均等に配分します
- `adjust` あり: 子要素のサイズを調整してコンテナを満たします

```tsx
import { withBalanceLayout } from '@fringeworks/react-layouts';

const Balance = withBalanceLayout('div');

<Balance direction="x" adjustX="grow" itemSizeX={200} gap={8} />;
```

### `layer`

子要素を重ねて全て同じ位置に配置します。

> `alignX` / `alignY` に `space-between`、`space-around`、`space-evenly` は指定できません。

```tsx
import { withLayerLayout } from '@fringeworks/react-layouts';

const Layer = withLayerLayout('div');

<Layer alignX="center" adjustX="shrink" itemSizeY={200} itemRatioX={1.6} />;
```

### `pin`

子要素を指定の座標に配置します。\
`alignX` / `alignY` で基準にする親要素の辺を選び、`withPinItem` の `offsetX` / `offsetY` でその辺からの距離を指定します。オフセットを指定しない場合は、子要素の `top` / `left` / `bottom` / `right` スタイルに従います。

```tsx
import { withPinItem, withPinLayout } from '@fringeworks/react-layouts';

const Pin = withPinLayout('div');
const PinItem = withPinItem('div');

<Pin alignX="right" alignY="bottom" itemSizeX={100} itemSizeY={80}>
  {/* 右端から20px、下端から親の高さの10%、他の子要素より手前 */}
  <PinItem offsetX={20} offsetY="10%" offsetZ={1} />
</Pin>;
```

### `withLayout`（レイアウトを切り替える）

`layout` プロパティで、適用するレイアウトを切り替えられるコンポーネントを作ります。`layout` の値に応じて、指定できるプロパティが変わります。`LayoutType` 以外の値が渡された場合は、レイアウトを適用せずに描画します。

```tsx
import { withLayout } from '@fringeworks/react-layouts';

const Layout = withLayout('div');

<Layout layout="stack" direction="y" gap={8} />;
<Layout layout="tile" itemSizeX={200} gap={8} />;
```

## API

### HOC

| HOC                                      | 説明                                                  |
| ---------------------------------------- | ----------------------------------------------------- |
| `withStackLayout(Component, options?)`   | `stack` のコンテナにする                              |
| `withFlowLayout(Component, options?)`    | `flow` のコンテナにする                               |
| `withTileLayout(Component, options?)`    | `tile` のコンテナにする                               |
| `withMatrixLayout(Component, options?)`  | `matrix` のコンテナにする                             |
| `withCenterLayout(Component, options?)`  | `center` のコンテナにする                             |
| `withPackLayout(Component, options?)`    | `pack` のコンテナにする                               |
| `withBalanceLayout(Component, options?)` | `balance` のコンテナにする                            |
| `withLayerLayout(Component, options?)`   | `layer` のコンテナにする                              |
| `withPinLayout(Component, options?)`     | `pin` のコンテナにする                                |
| `withLayout(Component, options?)`        | `layout` プロパティで選んだレイアウトのコンテナにする |
| `withStackItem(Component, options?)`     | `stack` の子要素にする                                |
| `withFlowItem(Component, options?)`      | `flow` の子要素にする                                 |
| `withCenterItem(Component, options?)`    | `center` の子要素にする                               |
| `withLayerItem(Component, options?)`     | `layer` の子要素にする                                |
| `withPinItem(Component, options?)`       | `pin` の子要素にする                                  |

```ts
withStackLayout<C extends ElementType>(
  Component: C,
  options?: WithStackLayoutOptions,
): StackLayoutComponent<C>
```

コンポーネントに、レイアウトのプロパティを追加したコンポーネントを返します。他のHOCも同じ形です。

| 引数        | 型                                   | 説明                                                         |
| ----------- | ------------------------------------ | ------------------------------------------------------------ |
| `Component` | `ElementType`                        | 対象のコンポーネント（`className` / `style` を透過すること） |
| `options?`  | `WithStackLayoutOptions` などHOCごと | 下記のオプション                                             |

| オプション        | 型                    | 説明                                                                                                       |
| ----------------- | --------------------- | ---------------------------------------------------------------------------------------------------------- |
| `displayName?`    | `string`              | コンポーネントに設定する `displayName`（デフォルト `<HOCの名前>(<元の名前>)`。例: `withStackLayout(div)`） |
| `className?`      | `string`              | 常に適用するクラス名                                                                                       |
| `styleProp?`      | `string`              | レイアウトのスタイルを渡すプロパティ名（デフォルト `'style'`）                                             |
| `styleMergeMode?` | `'merge' \| 'append'` | スタイルのマージ方法（デフォルト `'merge'`）                                                               |

### プロパティ

作成したコンポーネントには、対象のコンポーネントのプロパティに加えて、次のプロパティを指定できます。

| プロパティ   | 型           | 説明                                          |
| ------------ | ------------ | --------------------------------------------- |
| `className?` | `string`     | クラス名（レイアウトのクラス名と結合する）    |
| `scroll?`    | `boolean`    | `true` の場合、`overflow: auto` を適用する    |
| `layout`     | `LayoutType` | 適用するレイアウト（`withLayout` のみ。必須） |

レイアウトのスタイル（CSS変数と `scroll` の `overflow`）は、`styleProp` のプロパティ（デフォルト `style`）に指定した値とマージされます。同じプロパティを指定した場合は、指定した値が優先されます。`styleProp` に `style` 以外を指定した場合、`style` はそのままコンポーネントに渡されます。

`scroll` の `overflow` と、`overflowX` / `overflowY` のように名前が異なるプロパティを指定した場合も、指定した値が優先されます。ただし、再描画の途中で `scroll` を切り替える場合は React の制約により個別指定が上書きされることがあるため、対応しません（詳しくは [`@fringeworks/react-style-proxy` の注意事項](https://github.com/fringeworks-js/react-style-proxy/blob/main/README.ja.md#省略形と個別指定を組み合わせる場合)を参照）。

レイアウトのプロパティは、[`@fringeworks/style-layouts`](https://github.com/fringeworks-js/style-layouts/blob/main/README.ja.md) の各レイアウト関数・アイテム関数のオプションと同じです。

| プロパティ                           | 型                     | 説明                                                                  |
| ------------------------------------ | ---------------------- | --------------------------------------------------------------------- |
| `direction?`                         | `'x' \| 'y'`           | 主軸の方向 (デフォルト `'x'`)                                         |
| `alignX?` / `alignY?`                | `AlignX` / `AlignY`    | 子要素の横位置 / 縦位置 (デフォルト `'left'` / `'top'`)               |
| `adjustX?` / `adjustY?`              | `Adjust`               | 子要素のサイズ調整 (デフォルト `'none'`)                              |
| `gap?` / `gapX?` / `gapY?`           | `number`               | 子要素間の余白 (px。デフォルト `0`)                                   |
| `itemSizeX?` / `itemSizeY?`          | `number`               | 子要素の幅 / 高さ (px)                                                |
| `itemRatioX?` / `itemRatioY?`        | `number`               | 子要素の縦横比                                                        |
| `itemCountX?` / `itemCountY?`        | `number`               | 子要素の数 (`matrix`)                                                 |
| `tracksX?` / `tracksY?`              | `(string \| number)[]` | 子要素の個々のサイズ (`matrix`)                                       |
| `itemOffsetX?` / `itemOffsetY?`      | `number \| string`     | 子要素のオフセット (`pin`)                                            |
| `itemOffsetZ?`                       | `number`               | 子要素の重なり順 (`layer`・`pin`)                                     |
| `limitToItems?`                      | `boolean`              | `with*Item` の子要素だけを対象にする (デフォルト `false`)             |
| `sizeX?` / `sizeY?`                  | `number`               | 幅 / 高さ (px。`with*Item`)                                           |
| `ratioX?` / `ratioY?`                | `number`               | 縦横比 (`with*Item`)                                                  |
| `offsetX?` / `offsetY?` / `offsetZ?` | `number \| string`     | オフセット (`withPinItem`。`offsetZ` は `withLayerItem` も。数値のみ) |

### 定数

| 定数                                           | 説明                                                        |
| ---------------------------------------------- | ----------------------------------------------------------- |
| `LayoutType`                                   | `withLayout` の `layout` に指定できる値                     |
| `Direction`・`AlignX`・`AlignY`・`Adjust` など | `@fringeworks/style-layouts` の定数を再エクスポートしたもの |

### 型

| 型                                                           | 説明                                                  |
| ------------------------------------------------------------ | ----------------------------------------------------- |
| `With<Name>LayoutProps`                                      | `with<Name>Layout` のレイアウトのプロパティ           |
| `With<Name>LayoutOptions`                                    | `with<Name>Layout` のオプション                       |
| `<Name>LayoutComponent<C>`                                   | `with<Name>Layout` が返すコンポーネント               |
| `With<Name>ItemProps`                                        | `with<Name>Item` のアイテムのプロパティ               |
| `With<Name>ItemOptions`                                      | `with<Name>Item` のオプション                         |
| `<Name>ItemComponent<C>`                                     | `with<Name>Item` が返すコンポーネント                 |
| `WithLayoutProps`・`WithLayoutOptions`・`LayoutComponent<C>` | `withLayout` のプロパティ・オプション・コンポーネント |

`<Name>` には `Stack`・`Flow` などのレイアウト名が入ります（アイテムは `Stack`・`Flow`・`Center`・`Layer`・`Pin`）。

## ライセンス

MIT

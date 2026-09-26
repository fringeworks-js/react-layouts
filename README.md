# @niche-works/react-layout

`@niche-works/react-layout` is a niche library tailored for controlling child element layouts via CSS.

It provides Higher-Order Components (HOCs) that automatically apply class names and CSS variables based on the passed props.

**[日本語のREADMEはこちら](./README.ja.md)**

## Installation

```bash
npm install @niche-works/react-layout
# or
pnpm add @niche-works/react-layout

```

## Usage

You can create a component with layout capabilities by passing any base component to the HOC.

```tsx
import { withStackLayout } from '@niche-works/react-layout';

// * The wrapped component must pass down `className` and `style` (used for CSS variables) to its underlying element.
const MyContainer = (props: React.ComponentProps<'div'>) => <div {...props} />;

const StackContainer = withStackLayout(MyContainer);
```

```tsx
<StackContainer>
  <div>Item 1</div>
  <div>Item 2</div>
</StackContainer>
```

### Loading CSS

The HOCs do not import any CSS, so they work as-is in SSR and React Server Components. Import the CSS separately.

```ts
import { withStackLayout } from '@niche-works/react-layout';

// Import all layouts at once
import '@niche-works/react-layout/styles.css';

// Or import only what you need
import '@niche-works/react-layout/stack.css';
import '@niche-works/react-layout/tile.css';
```

If you want the CSS to be loaded automatically, use the modules under `with-css`. This requires a bundler that can handle CSS imports.

```ts
import { withStackLayout } from '@niche-works/react-layout/with-css';
```

## Layout Types

### `stack`

Arranges child elements in a single row or column (linear layout).

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

Similar to `stack`, but wraps child elements onto multiple lines if they exceed the container size.

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

> `grow`, `shrink`, and `fit` cannot be specified for `adjust` on the cross-axis.

### `matrix`

Arranges child elements in a grid by specifying the number of columns and rows.

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

For each axis, either `itemCount` or `child` is required (specifying both is not allowed).

> **Note:** This layout assumes the container's size is determined externally. Percentage values may not work as intended in parent elements whose sizes are determined by their children (e.g., `width: max-content`).

### `tile`

Arranges child elements in a grid based on the child size. The number of columns is automatically calculated depending on the parent container's size and the child elements' sizes.

```tsx
import { withTileLayout } from '@niche-works/react-layout';

const TileContainer = withTileLayout(Container);

// ----------------------

<TileContainer direction="x" itemSizeX="200px" adjustX="fit" spacing="8px" />;
```

> **Note:** Similar to `matrix`, this layout assumes the container's size is determined externally.

### `balance`

Distributes child elements evenly in a single row or column.

- **Without `adjust`:** Maintains the original size of child elements and distributes the remaining space evenly.
- **With `adjust`:** Adjusts the size of child elements to fill the container.

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

Scales and packs child elements evenly to perfectly fit the size of the parent container.

```tsx
import { withPackLayout } from '@niche-works/react-layout';

const PackContainer = withPackLayout(Container);

// ----------------------

<PackContainer direction="x" spacing="8px" />;
```

### `pin`

Positions child elements at specific coordinates. Children should specify their positions using `top` / `left` / `bottom` / `right` styles.

```tsx
import { withPinLayout } from '@niche-works/react-layout';

const PinContainer = withPinLayout(Container);

// ----------------------

<PinContainer itemSizeX="100px" itemSizeY="80px" />;
```

## Options

### Option List

| Option        | Type                   | Description                                               |
| ------------- | ---------------------- | --------------------------------------------------------- |
| `direction?`  | `'x' \| 'y'`           | Direction of the main axis                                |
| `alignX?`     | [`AlignX`]()           | Horizontal alignment of child elements                    |
| `alignY?`     | [`AlignY`]()           | Vertical alignment of child elements                      |
| `adjustX?`    | [`Adjust`]()           | Horizontal size adjustment for child elements             |
| `adjustY?`    | [`Adjust`]()           | Vertical size adjustment for child elements               |
| `spacing?`    | `string \| number`     | Gap between child elements (both horizontal and vertical) |
| `spacingX?`   | `string \| number`     | Horizontal gap between child elements                     |
| `spacingY?`   | `string \| number`     | Vertical gap between child elements                       |
| `itemSizeX?`  | `string \| number`     | Width of child elements                                   |
| `itemSizeY?`  | `string \| number`     | Height of child elements                                  |
| `itemCountX?` | `number`               | Number of child elements horizontally                     |
| `itemCountY?` | `number`               | Number of child elements vertically                       |
| `tracksX?`    | `(string \| number)[]` | Individual horizontal sizes for each child element        |
| `tracksY?`    | `(string \| number)[]` | Individual vertical sizes for each child element          |

### `Adjust` Values

| Value    | When child is smaller than parent | When child is larger than parent |
| -------- | --------------------------------- | -------------------------------- |
| `none`   | Keeps original size               | Keeps original size              |
| `grow`   | Expands                           | Keeps original size              |
| `shrink` | Keeps original size               | Shrinks                          |
| `fit`    | Expands                           | Shrinks                          |

### `AlignX` Values

`'left'` | `'center'` | `'right'` | `'space-between'` | `'space-around'` | `'space-evenly'`

### `AlignY` Values

`'top'` | `'middle'` | `'bottom'` | `'space-between'` | `'space-around'` | `'space-evenly'`

## License

MIT

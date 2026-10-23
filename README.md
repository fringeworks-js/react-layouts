# @fringeworks/react-layouts

`@fringeworks/react-layouts` is a library some will find handy, specialized in controlling child element layout with CSS.\
It provides HOCs that automatically set class names and CSS custom properties based on props. It is the React version of [`@fringeworks/style-layouts`](https://github.com/fringeworks-js/style-layouts).

**[日本語のREADMEはこちら](./README.ja.md)**

## Installation

```bash
npm install @fringeworks/react-layouts
# or
pnpm add @fringeworks/react-layouts
```

## Usage

Pass any component to an HOC to create a component with layout functionality.

```tsx
import { withStackLayout } from '@fringeworks/react-layouts';

// The component must pass through className and style (for CSS custom properties)
const MyContainer = (props: React.ComponentProps<'div'>) => <div {...props} />;

const StackContainer = withStackLayout(MyContainer);

<StackContainer direction="x" gap={8}>
  <div>Item 1</div>
  <div>Item 2</div>
</StackContainer>;
```

HTML element names (such as `'div'`) can also be passed as-is. Layout props are not passed to the component; they are applied as class names and CSS custom properties (`className` / `style`). All other props are passed to the component as-is.

### CSS

The HOCs do not import any CSS, so they work as-is in SSR and React Server Components. Import the CSS separately.

```ts
import { withStackLayout } from '@fringeworks/react-layouts';

// Import all layouts at once
import '@fringeworks/react-layouts/styles.css';

// Or import only what you need
import '@fringeworks/react-layouts/stack.css';
import '@fringeworks/react-layouts/tile.css';
```

If you want the CSS to be loaded automatically, use the modules under `with-css`. This requires a bundler that can handle CSS imports.

```ts
import { withStackLayout } from '@fringeworks/react-layouts/with-css';
```

### Per-Child Props (`with*Item`)

Props specified on the container apply to all child elements. To change them for a specific child only, use a component created with `with*Item` for that child. Only the specified props override the container's props.

| HOC              | Container          |
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
  <div>100px wide</div>
  <StackItem adjustX="grow">Fills the remaining width</StackItem>
</Stack>;
```

With `limitToItems` on the container, only the children made with `with*Item` components are laid out.

Item props drop the `item` prefix for sizes and ratios (`sizeX` on an item versus `itemSizeX` on the container). For details, see "Per-Child Options (`*Item`)" in the [`@fringeworks/style-layouts` README](https://github.com/fringeworks-js/style-layouts/blob/main/README.md) (the options of `*Item()` become the props as-is).

#### Children That Are Both a Container and an Item

`with*Layout` and `with*Item` cannot be stacked (props with the same name could not be told apart). When a child is both a container and an item, pass the return value of `*Item()` from `@fringeworks/style-layouts` to the container component as `className` / `style`. Since this imports `@fringeworks/style-layouts` directly, add it to your dependencies.

```tsx
import { layerItem } from '@fringeworks/style-layouts/layer';

const Layer = withLayerLayout('div');

<Layer>
  {/* Itself a layer item (200px wide); its children are laid out with stack */}
  <Stack itemSizeX={50} {...layerItem({ sizeX: 200 })}>
    ...
  </Stack>
</Layer>;
```

## Layout Types

For the detailed behavior of each layout, see the [`@fringeworks/style-layouts` README](https://github.com/fringeworks-js/style-layouts/blob/main/README.md).

### `stack`

Arranges child elements in a single row or column.

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

Like `stack`, but wraps child elements when they exceed the container size.

> `grow`, `shrink`, and `fit` cannot be specified for `adjustX` / `adjustY` on the cross axis.

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

Arranges child elements in a grid based on child element size. The number of columns is determined automatically based on the container and child sizes.

> **Note:** This layout assumes the container size is determined externally. Containers sized by their own content (e.g. `width: max-content`) may cause unexpected behavior with percentage-based values.

```tsx
import { withTileLayout } from '@fringeworks/react-layouts';

const Tile = withTileLayout('div');

<Tile direction="x" adjustX="fit" itemSizeX={200} gap={8} />;
```

### `matrix`

Arranges child elements in a grid with explicit column and row counts.

Either `itemCount` or `tracks` is required per axis (not both). `itemSize` is specified together with `itemCount`.

> **Note:** Like `tile`, this layout assumes the container size is determined externally.

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

// Using explicit track templates
<Matrix tracksX={['1fr', '2fr', '1fr']} itemCountY={3} />;
```

### `center`

Places child elements at the center of the container.\
Even when the container becomes smaller than the child elements, the first child element remains visible within the container without overflow.

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

Sizes child elements equally to fill the container.

```tsx
import { withPackLayout } from '@fringeworks/react-layouts';

const Pack = withPackLayout('div');

<Pack direction="x" gap={8} />;
```

### `balance`

Arranges child elements evenly in a single row or column.

- Without `adjust`: maintains child size and distributes space evenly between items
- With `adjust`: adjusts child size to fill the container evenly

```tsx
import { withBalanceLayout } from '@fringeworks/react-layouts';

const Balance = withBalanceLayout('div');

<Balance direction="x" adjustX="grow" itemSizeX={200} gap={8} />;
```

### `layer`

Stacks child elements on top of each other at the same position.

> `space-between`, `space-around`, and `space-evenly` cannot be specified for `alignX` / `alignY`.

```tsx
import { withLayerLayout } from '@fringeworks/react-layouts';

const Layer = withLayerLayout('div');

<Layer alignX="center" adjustX="shrink" itemSizeY={200} itemRatioX={1.6} />;
```

### `pin`

Positions child elements at specified coordinates.\
Choose the edge of the container to measure from with `alignX` / `alignY`, and specify the distance from that edge with `offsetX` / `offsetY` of `withPinItem`. Without offsets, the child's own `top` / `left` / `bottom` / `right` styles are used.

```tsx
import { withPinItem, withPinLayout } from '@fringeworks/react-layouts';

const Pin = withPinLayout('div');
const PinItem = withPinItem('div');

<Pin alignX="right" alignY="bottom" itemSizeX={100} itemSizeY={80}>
  {/* 20px from the right, 10% of the container height from the bottom, in front of the others */}
  <PinItem offsetX={20} offsetY="10%" offsetZ={1} />
</Pin>;
```

### `withLayout` (Switching Layouts)

Creates a component whose layout is switched by the `layout` prop. The available props change according to the value of `layout`. If a value other than a `LayoutType` is passed, the component renders without applying a layout.

```tsx
import { withLayout } from '@fringeworks/react-layouts';

const Layout = withLayout('div');

<Layout layout="stack" direction="y" gap={8} />;
<Layout layout="tile" itemSizeX={200} gap={8} />;
```

## API

### HOCs

| HOC                                      | Description                                        |
| ---------------------------------------- | -------------------------------------------------- |
| `withStackLayout(Component, options?)`   | Makes a `stack` container                          |
| `withFlowLayout(Component, options?)`    | Makes a `flow` container                           |
| `withTileLayout(Component, options?)`    | Makes a `tile` container                           |
| `withMatrixLayout(Component, options?)`  | Makes a `matrix` container                         |
| `withCenterLayout(Component, options?)`  | Makes a `center` container                         |
| `withPackLayout(Component, options?)`    | Makes a `pack` container                           |
| `withBalanceLayout(Component, options?)` | Makes a `balance` container                        |
| `withLayerLayout(Component, options?)`   | Makes a `layer` container                          |
| `withPinLayout(Component, options?)`     | Makes a `pin` container                            |
| `withLayout(Component, options?)`        | Makes a container of the layout chosen by `layout` |
| `withStackItem(Component, options?)`     | Makes a child of `stack`                           |
| `withFlowItem(Component, options?)`      | Makes a child of `flow`                            |
| `withCenterItem(Component, options?)`    | Makes a child of `center`                          |
| `withLayerItem(Component, options?)`     | Makes a child of `layer`                           |
| `withPinItem(Component, options?)`       | Makes a child of `pin`                             |

```ts
withStackLayout<C extends ElementType>(
  Component: C,
  options?: WithStackLayoutOptions,
): StackLayoutComponent<C>
```

Returns the component with the layout props added. The other HOCs have the same shape.

| Parameter   | Type                                   | Description                                                    |
| ----------- | -------------------------------------- | -------------------------------------------------------------- |
| `Component` | `ElementType`                          | The target component (must pass through `className` / `style`) |
| `options?`  | `WithStackLayoutOptions`, etc. per HOC | The options below                                              |

| Option            | Type                  | Description                                                                                          |
| ----------------- | --------------------- | ---------------------------------------------------------------------------------------------------- |
| `displayName?`    | `string`              | `displayName` of the component (default: `<HOC name>(<original name>)`, e.g. `withStackLayout(div)`) |
| `className?`      | `string`              | Class name always applied                                                                            |
| `styleProp?`      | `string`              | Name of the prop that receives the layout style (default: `'style'`)                                 |
| `styleMergeMode?` | `'merge' \| 'append'` | How styles are merged (default: `'merge'`)                                                           |

### Props

The created component accepts the following props in addition to the target component's props.

| Prop         | Type         | Description                                       |
| ------------ | ------------ | ------------------------------------------------- |
| `className?` | `string`     | Class name (combined with the layout class names) |
| `scroll?`    | `boolean`    | Applies `overflow: auto` when `true`              |
| `layout`     | `LayoutType` | The layout to apply (`withLayout` only; required) |

The layout style (CSS custom properties and the `overflow` from `scroll`) is merged with the value of the `styleProp` prop (default: `style`). When the same property is specified, your value takes precedence. If `styleProp` is set to something other than `style`, `style` is passed to the component as-is.

Your value also takes precedence over the `overflow` from `scroll` when you specify a property with a different name, such as `overflowX` / `overflowY`. However, toggling `scroll` during a re-render is not supported, because a limitation of React may cause the longhand property to be overridden (see [the notes of `@fringeworks/react-style-proxy`](https://github.com/fringeworks-js/react-style-proxy#mixing-shorthand-and-longhand-properties)).

The layout props are the same as the options of the layout functions and item functions of [`@fringeworks/style-layouts`](https://github.com/fringeworks-js/style-layouts/blob/main/README.md).

| Prop                                 | Type                   | Description                                                               |
| ------------------------------------ | ---------------------- | ------------------------------------------------------------------------- |
| `direction?`                         | `'x' \| 'y'`           | Main axis direction (default: `'x'`)                                      |
| `alignX?` / `alignY?`                | `AlignX` / `AlignY`    | Horizontal / vertical alignment of children (default: `'left'` / `'top'`) |
| `adjustX?` / `adjustY?`              | `Adjust`               | Size adjustment of children (default: `'none'`)                           |
| `gap?` / `gapX?` / `gapY?`           | `number`               | Gap between children in px (default: `0`)                                 |
| `itemSizeX?` / `itemSizeY?`          | `number`               | Width / height of children in px                                          |
| `itemRatioX?` / `itemRatioY?`        | `number`               | Aspect ratio of children                                                  |
| `itemCountX?` / `itemCountY?`        | `number`               | Number of children (`matrix`)                                             |
| `tracksX?` / `tracksY?`              | `(string \| number)[]` | Individual sizes of children (`matrix`)                                   |
| `itemOffsetX?` / `itemOffsetY?`      | `number \| string`     | Offset of children (`pin`)                                                |
| `itemOffsetZ?`                       | `number`               | Stacking order of children (`layer`, `pin`)                               |
| `limitToItems?`                      | `boolean`              | Targets only `with*Item` children (default: `false`)                      |
| `sizeX?` / `sizeY?`                  | `number`               | Width / height in px (`with*Item`)                                        |
| `ratioX?` / `ratioY?`                | `number`               | Aspect ratio (`with*Item`)                                                |
| `offsetX?` / `offsetY?` / `offsetZ?` | `number \| string`     | Offset (`withPinItem`; `offsetZ` also `withLayerItem`, numbers only)      |

### Constants

| Constant                                        | Description                                           |
| ----------------------------------------------- | ----------------------------------------------------- |
| `LayoutType`                                    | Values for `layout` of `withLayout`                   |
| `Direction`, `AlignX`, `AlignY`, `Adjust`, etc. | Re-exported constants of `@fringeworks/style-layouts` |

### Types

| Type                                                         | Description                                   |
| ------------------------------------------------------------ | --------------------------------------------- |
| `With<Name>LayoutProps`                                      | Layout props of `with<Name>Layout`            |
| `With<Name>LayoutOptions`                                    | Options of `with<Name>Layout`                 |
| `<Name>LayoutComponent<C>`                                   | Component returned by `with<Name>Layout`      |
| `With<Name>ItemProps`                                        | Item props of `with<Name>Item`                |
| `With<Name>ItemOptions`                                      | Options of `with<Name>Item`                   |
| `<Name>ItemComponent<C>`                                     | Component returned by `with<Name>Item`        |
| `WithLayoutProps`, `WithLayoutOptions`, `LayoutComponent<C>` | Props, options, and component of `withLayout` |

`<Name>` is a layout name such as `Stack` or `Flow` (for items: `Stack`, `Flow`, `Center`, `Layer`, `Pin`).

## License

MIT

## Btn

Commonly used button.

### Basic usage

:::demo Use `type`, `plain`, `round` and `circle` to define Btn's style.

```html
<el-row>
  <el-btn>Default</el-btn>
  <el-btn type="primary">Primary</el-btn>
  <el-btn type="success">Success</el-btn>
  <el-btn type="info">Info</el-btn>
  <el-btn type="warning">Warning</el-btn>
  <el-btn type="danger">Danger</el-btn>
</el-row>

<el-row>
  <el-btn plain>Plain</el-btn>
  <el-btn type="primary" plain>Primary</el-btn>
  <el-btn type="success" plain>Success</el-btn>
  <el-btn type="info" plain>Info</el-btn>
  <el-btn type="warning" plain>Warning</el-btn>
  <el-btn type="danger" plain>Danger</el-btn>
</el-row>

<el-row>
  <el-btn round>Round</el-btn>
  <el-btn type="primary" round>Primary</el-btn>
  <el-btn type="success" round>Success</el-btn>
  <el-btn type="info" round>Info</el-btn>
  <el-btn type="warning" round>Warning</el-btn>
  <el-btn type="danger" round>Danger</el-btn>
</el-row>

<el-row>
  <el-btn icon="el-icon-search" circle></el-btn>
  <el-btn type="primary" icon="el-icon-edit" circle></el-btn>
  <el-btn type="success" icon="el-icon-check" circle></el-btn>
  <el-btn type="info" icon="el-icon-message" circle></el-btn>
  <el-btn type="warning" icon="el-icon-star-off" circle></el-btn>
  <el-btn type="danger" icon="el-icon-delete" circle></el-btn>
</el-row>
```
:::

### Disabled Btn

The `disabled` attribute determines if the button is disabled.

:::demo Use `disabled` attribute to determine whether a button is disabled. It accepts a `Boolean` value.

```html
<el-row>
  <el-btn disabled>Default</el-btn>
  <el-btn type="primary" disabled>Primary</el-btn>
  <el-btn type="success" disabled>Success</el-btn>
  <el-btn type="info" disabled>Info</el-btn>
  <el-btn type="warning" disabled>Warning</el-btn>
  <el-btn type="danger" disabled>Danger</el-btn>
</el-row>

<el-row>
  <el-btn plain disabled>Plain</el-btn>
  <el-btn type="primary" plain disabled>Primary</el-btn>
  <el-btn type="success" plain disabled>Success</el-btn>
  <el-btn type="info" plain disabled>Info</el-btn>
  <el-btn type="warning" plain disabled>Warning</el-btn>
  <el-btn type="danger" plain disabled>Danger</el-btn>
</el-row>
```
:::

### Text Btn

Btns without border and background.

:::demo
```html
<el-btn type="text">Text Btn</el-btn>
<el-btn type="text" disabled>Text Btn</el-btn>
```
:::

### Icon Btn

Use icons to add more meaning to Btn. You can use icon alone to save some space, or use it with text.

:::demo Use the `icon` attribute to add icon. You can find the icon list in Element icon component. Adding icons to the right side of the text is achievable with an `<i>` tag. Custom icons can be used as well.

```html
<el-btn type="primary" icon="el-icon-edit"></el-btn>
<el-btn type="primary" icon="el-icon-share"></el-btn>
<el-btn type="primary" icon="el-icon-delete"></el-btn>
<el-btn type="primary" icon="el-icon-search">Search</el-btn>
<el-btn type="primary">Upload<i class="el-icon-upload el-icon-right"></i></el-btn>
```
:::

### Btn Group

Displayed as a button group, can be used to group a series of similar operations.

:::demo Use tag `<el-btn-group>` to group your buttons.

```html
<el-btn-group>
  <el-btn type="primary" icon="el-icon-arrow-left">Previous Page</el-btn>
  <el-btn type="primary">Next Page<i class="el-icon-arrow-right el-icon-right"></i></el-btn>
</el-btn-group>
<el-btn-group>
  <el-btn type="primary" icon="el-icon-edit"></el-btn>
  <el-btn type="primary" icon="el-icon-share"></el-btn>
  <el-btn type="primary" icon="el-icon-delete"></el-btn>
</el-btn-group>
```
:::

### Loading Btn

Click the button to load data, then the button displays a loading state.

:::demo Set `loading` attribute to `true` to display loading state.

```html
<el-btn type="primary" :loading="true">Loading</el-btn>
```
:::

### Sizes

Besides default size, Btn component provides three additional sizes for you to choose among different scenarios.

:::demo Use attribute `size` to set additional sizes with `medium`, `small` or `mini`.

```html
<el-row>
  <el-btn>Default</el-btn>
  <el-btn size="medium">Medium</el-btn>
  <el-btn size="small">Small</el-btn>
  <el-btn size="mini">Mini</el-btn>
</el-row>
<el-row>
  <el-btn round>Default</el-btn>
  <el-btn size="medium" round>Medium</el-btn>
  <el-btn size="small" round>Small</el-btn>
  <el-btn size="mini" round>Mini</el-btn>
</el-row>
```
:::

### Attributes
| Attribute      | Description    | Type      | Accepted values       | Default   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | button size   | string  |   medium / small / mini            |    —     |
| type     | button type   | string    |   primary / success / warning / danger / info / text |     —    |
| plain     | determine whether it's a plain button   | boolean    | — | false   |
| round     | determine whether it's a round button   | boolean    | — | false   |
| circle     | determine whether it's a circle button   | boolean    | — | false   |
| loading   | determine whether it's loading   | boolean    | — | false   |
| disabled  | disable the button    | boolean   | —   | false   |
| icon  | icon class name | string   |  —  |  —  |
| autofocus  | same as native button's `autofocus` | boolean   |  —  |  false  |
| native-type | same as native button's `type` | string | button / submit / reset | button |
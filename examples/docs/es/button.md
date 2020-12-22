## Btn

Botones comúnmente usados.

### Uso básico

:::demo Use `type`, `plain`,`round` y `circle` para definir estilos a los botones.

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

### Botón deshabilitado

El atributo `disabled` determina su un botón esta deshabilitado.

:::demo Use el atributo `disabled` para determinar si un botón esta deshabilitado. Acepta un valor `Boolean`.

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

### Botón de texto

Botones sin borde ni fondo.

:::demo
```html
<el-btn type="text">Text Btn</el-btn>
<el-btn type="text" disabled>Text Btn</el-btn>
```
:::

### Botón icono

Use iconos para darle mayor significado a Btn. Se puede usar simplemente un icono o un icono con texto.

:::demo Use el atributo `icon` para agregar un icono. Puede encontrar el listado de iconos en el componente de iconos. Agregar iconos a la derecha del texto se puede conseguir con un tag `<i>`. También se pueden usar iconos personalizados.

```html
<el-btn type="primary" icon="el-icon-edit"></el-btn>
<el-btn type="primary" icon="el-icon-share"></el-btn>
<el-btn type="primary" icon="el-icon-delete"></el-btn>
<el-btn type="primary" icon="el-icon-search">Search</el-btn>
<el-btn type="primary">Upload<i class="el-icon-upload el-icon-right"></i></el-btn>
```
:::

### Grupo de botones

Mostrar un grupo de botones puede ser usado para mostrar un grupo de operaciones similares.

:::demo Use el tag `<el-btn-group>` para agrupar sus botones.

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

### Botón de descarga

Cuando se hace clic en un botón para descargar datos, el botón muestra un estado de descarga.

:::demo Ajuste el atributo `loading` a `true` para mostrar el estado de descarga.

```html
<el-btn type="primary" :loading="true">Loading</el-btn>
```
:::

### Tamaños

Además del tamaño por defecto, el componente Btn provee tres tamaños adicionales para utilizar en diferentes escenarios.

:::demo Use el atributo `size` para setear tamaños adicionales con `medium`, `small` o `mini`.

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

### Atributos
| Atributo    | Descripción                                   | Tipo    | Valores aceptados                                  | Por defecto |
| ----------- | --------------------------------------------- | ------- | -------------------------------------------------- | ----------- |
| size        | tamaño del botón                              | string  | medium / small / mini                              | —           |
| type        | tipo de botón                                 | string  | primary / success / warning / danger / info / text | —           |
| plain       | determinar si es o no un botón plano          | boolean | —                                                  | false       |
| round       | determinar si es o no un botón redondo        | boolean | —                                                  | false       |
| circle      | determina si es un botón circular             | boolean | —                                                  | false       |
| loading     | determinar si es o no un botón de descarga    | boolean | —                                                  | false       |
| disabled    | deshabilitar el botón                         | boolean | —                                                  | false       |
| icon        | nombre de la clase del icono                  | string  | —                                                  | —           |
| autofocus   | misma funcionalidad que la nativa `autofocus` | boolean | —                                                  | false       |
| native-type | misma funcionalidad que la nativa `type`      | string  | button / submit / reset                            | button      |


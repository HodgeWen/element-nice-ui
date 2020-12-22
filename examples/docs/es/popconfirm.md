## Popconfirm

Un dialogo de confirmación simple asociado al evento click de un elemento.

### Uso básico

Popconfirm es parecido a Popover. Para algunos atributos duplicados, por favor consulte la documentación de Popover.

:::demo Solo el atributo  `title`  esta disponible en Popconfirm, `content` sera ignorado.
```html
<template>
<el-popconfirm
  title="Are you sure to delete this?"
>
  <el-btn slot="reference">Delete</el-btn>
</el-popconfirm>
</template>
````
:::

### Personalización
Se puede personalizar Popconfirm así:
:::demo

```html
<template>
<el-popconfirm
  confirm-button-text='OK'
  cancel-btn-text='No, Thanks'
  icon="el-icon-info"
  icon-color="red"
  title="Are you sure to delete this?"
>
  <el-btn slot="reference">Delete</el-btn>
</el-popconfirm>
</template>
```
:::

### Atributos
| Atributo     | Descripción | Tipo    | Valores aceptados | Por defecto |
|--------------------|----------------------------------------------------------|-------------------|-------------|--------|
|  title              | Titulo | String | — | — |
|  confirm-button-text              | Texto del botón de confirmación | String | — | — |
|  cancel-btn-text              | Texto del botón de cancelación | String | — | — |
|  confirm-button-type              | Tipo del botón de confirmación | String | — | Primary |
|  cancel-btn-type              | Tipo del botón de cancelación | String | — | Text |
|  icon              | Icono | String | — | el-icon-question |
|  icon-color              | Color icono | String | — | #f90 |
|  hide-icon              | ¿Es un icono oculto? | Boolean | — | false |

### Slot
| Nombre | Descripción |
|--- | ---|
| reference | Elemento HTML que activa el Popconfirm |

### Eventos
| Nombre Evento | Descripción | Parámetros |
|---------|--------|---------|
| confirm | Se activa cuando se pulsa el botón de confirmación | — |
| cancel | Se activa cuando se pulsa el botón de cancelación | — |
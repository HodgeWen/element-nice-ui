## Bouton

Bouton communément utilisé.

### Usage

:::demo Utilisez `type`, `plain`, `round` et `circle` pour définir le style du bouton.

```html
<el-row>
  <el-btn>Défaut</el-btn>
  <el-btn type="primary">Primary</el-btn>
  <el-btn type="success">Success</el-btn>
  <el-btn type="info">Info</el-btn>
  <el-btn type="warning">Warning</el-btn>
  <el-btn type="danger">Danger</el-btn>
</el-row>

<el-row>
  <el-btn plain>Plein</el-btn>
  <el-btn type="primary" plain>Primary</el-btn>
  <el-btn type="success" plain>Success</el-btn>
  <el-btn type="info" plain>Info</el-btn>
  <el-btn type="warning" plain>Warning</el-btn>
  <el-btn type="danger" plain>Danger</el-btn>
</el-row>

<el-row>
  <el-btn round>Arrondi</el-btn>
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

### Bouton désactivé

L'attribut `disabled` détermine si le bouton est désactivé.

:::demo Utilisez l'attribut `disabled` pour déterminer si un bouton est désactivé ou non. Il accepte un `Boolean`.

```html
<el-row>
  <el-btn disabled>Défaut</el-btn>
  <el-btn type="primary" disabled>Principal</el-btn>
  <el-btn type="success" disabled>Succès</el-btn>
  <el-btn type="info" disabled>Info</el-btn>
  <el-btn type="warning" disabled>Attention</el-btn>
  <el-btn type="danger" disabled>Danger</el-btn>
</el-row>

<el-row>
  <el-btn plain disabled>Plein</el-btn>
  <el-btn type="primary" plain disabled>Principal</el-btn>
  <el-btn type="success" plain disabled>Succès</el-btn>
  <el-btn type="info" plain disabled>Info</el-btn>
  <el-btn type="warning" plain disabled>Attention</el-btn>
  <el-btn type="danger" plain disabled>Danger</el-btn>
</el-row>
```
:::

### Bouton texte

Bouton sans bordure ni fond.

:::demo
```html
<el-btn type="text">Bouton texte</el-btn>
<el-btn type="text" disabled>Bouton texte</el-btn>
```
:::

### Icône

Utilisez des icônes pour ajouter plus de sens aux boutons. Vous pouvez utiliser uniquement l'icône pour économiser de l'espace, ou bien l'utiliser avec du texte.

:::demo Utilisez l'attribut `icon` pour ajouter une icône. Vous pourrez trouver la liste des icônes dans le composant Icon d'Element. Ajouter des icônes sur le coté droit du texte est possible grâce à la balise `<i>`. Des icônes personnalisées peuvent également être utilisées.

```html
<el-btn type="primary" icon="el-icon-edit"></el-btn>
<el-btn type="primary" icon="el-icon-share"></el-btn>
<el-btn type="primary" icon="el-icon-delete"></el-btn>
<el-btn type="primary" icon="el-icon-search">Recherche</el-btn>
<el-btn type="primary">Upload<i class="el-icon-upload el-icon-right"></i></el-btn>
```
:::

### Groupes de boutons

Affiche un groupe de bouton. Peut être utilisé pour grouper un ensemble d'opérations similaires.

:::demo Utilisez la balise `<el-btn-group>` pour grouper vos boutons.

```html
<el-btn-group>
  <el-btn type="primary" icon="el-icon-arrow-left">Page précédente</el-btn>
  <el-btn type="primary">Page suivante<i class="el-icon-arrow-right el-icon-right"></i></el-btn>
</el-btn-group>
<el-btn-group>
  <el-btn type="primary" icon="el-icon-edit"></el-btn>
  <el-btn type="primary" icon="el-icon-share"></el-btn>
  <el-btn type="primary" icon="el-icon-delete"></el-btn>
</el-btn-group>
```
:::

### Bouton en chargement

Cliquez sur le bouton pour charger des données et il affichera un état de chargement.

:::demo Configurez l'attribut `loading` à `true` pour afficher un état de chargement.

```html
<el-btn type="primary" :loading="true">Chargement</el-btn>
```
:::

### Tailles

En plus de la taille par défaut, le composant Btn fournit trois tailles supplémentaires pour différents scénarios.

:::demo Utilisez l'attribut `size` pour choisir d'autres tailles parmi `medium`, `small` ou `mini`.

```html
<el-row>
  <el-btn>Défaut</el-btn>
  <el-btn size="medium">Medium</el-btn>
  <el-btn size="small">Small</el-btn>
  <el-btn size="mini">Mini</el-btn>
</el-row>
<el-row>
  <el-btn round>Défaut</el-btn>
  <el-btn size="medium" round>Medium</el-btn>
  <el-btn size="small" round>Small</el-btn>
  <el-btn size="mini" round>Mini</el-btn>
</el-row>
```
:::

### Attributs
| Attribut      | Description    | Type      | Valeurs acceptées       | Défaut   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | Taille du bouton.   | string  |   medium / small / mini            |    —     |
| type     | Type du bouton.   | string    |   primary / success / warning / danger / info / text |     —    |
| plain     | Détermine si le bouton est plein.   | boolean    | — | false   |
| round     | Détermine si le bouton est arrondi.   | boolean    | — | false   |
| circle     | Détermine si le bouton est un cercle.   | boolean    | — | false   |
| loading   | Détermine si l'état de chargement est affiché.   | boolean    | — | false   |
| disabled  | Désactive le bouton    | boolean   | —   | false   |
| icon  | Classe de l'icône. | string   |  —  |  —  |
| autofocus  | Identique à l'attribut natif `autofocus` | boolean   |  —  |  false  |
| native-type | Identique à l'attribut natif `type` | string | button / submit / reset | button |

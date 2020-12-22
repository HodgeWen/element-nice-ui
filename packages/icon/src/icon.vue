<template>
  <i :class="name" @click="$emit('click', $event)"></i>
</template>

<script>
export default {
  name: 'ElIcon',

  props: {
    name: String
  }
}
</script>

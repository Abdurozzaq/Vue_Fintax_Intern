<template>
  <div>
    <div v-bind:class="['alert', 'alert-' + color]" role="alert">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'color',
    'text'
  ]
}
</script>
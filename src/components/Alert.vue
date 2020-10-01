<template>
  <div>

    <!-- 
      Ini salah satu dari class dan style binding
      saya beri v-bind:class, walaupun bisa dengan hanya
      :class
    -->
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
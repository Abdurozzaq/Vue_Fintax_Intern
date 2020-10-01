<template>
  <!-- Simple Math (SUM) Calculator -->
  <div>
    <div class="card mx-auto mt-5" style="width: 60vw;">
      <div class="card-body">
        <h5 class="card-title">Simple SUM Calculator</h5>
        <form @submit.prevent="calculate" >
          <input v-model="num1" class="form-control mb-3" type="text" placeholder="Angka 1">
          <h5 class="mb-3">+</h5>
          <input v-model="num2" class="form-control mb-3" type="text" placeholder="Angka 2">
          <button type="submit" class="btn btn-primary mb-3">Calculate</button>
          <button @click.prevent="reset" class="btn btn-warning ml-3 mb-3">Reset</button>
        </form>
      </div>
    </div>

    <div class="card mx-auto mt-5" style="width: 60vw;">
      <div class="card-body">
        <h1>{{ hasil }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num1: "",
      num2: "",
      hasil: 0
    }
  }, // end of data

  methods: {
    calculate: function() {
      let currentObj = this

      currentObj.hasil = Number(currentObj.num1) + Number(currentObj.num2)
    },
    reset: function() {
      let currentObj = this

      currentObj.hasil = 0
    }
  }
}
</script>
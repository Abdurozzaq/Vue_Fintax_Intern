<template>
  <div>
    <!-- Komunikasi Parent Ke Child -->
    <!-- Nested Component -->
    <!-- ada juga di setiap page yang butuh Alert Component -->
    <Alert class="mx-auto mt-5" style="width: 60vw;" v-if="alert" :color="alertColor" :text="alertText" />

    <div class="card mx-auto mt-5" style="width: 60vw;">
      <div class="card-body">
        <h5 class="card-title">Tambah Pegawai</h5>
        <form @submit.prevent="tambah" >
          <div class="form-group">
            <label for="InputName1">Name</label>
            <input v-model="name" type="name" class="form-control" id="InputName1" aria-describedby="nameHelp">
          </div>
          <div class="form-group">
            <label for="InputJob1">Job</label>
            <input v-model="job" type="job" class="form-control" id="InputJob1">
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>

    <div v-if="json.length != 0" class="card mx-auto mt-5" style="width: 60vw;">
      <div class="card-body">
        <pre>
          {{ json }}
        </pre>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import Alert from '../../components/Alert.vue'
export default {
  components: {
    Alert,
  },
  data() {
    return {
      name: "morpheus",
      job: "leader",

      // Alert
      alert: false,
      alertColor: "",
      alertText: "",

      // Response
      json: "",
    }
  }, // end of data

  methods: {
    tambah: function() {
      let currentObj = this

      axios.post('https://reqres.in/api/users', {
        name: currentObj.name,
        job: currentObj.job
      })
      .then(function (response) {
        console.log(response);
        currentObj.name = ""
        currentObj.job = ""

        // alert
        currentObj.alertColor = "success"
        currentObj.alertText = "Berhasil Tambah Pegawai!"
        currentObj.alert = true

        // response
        currentObj.json = JSON.stringify(response.data,null,2);

      })
      .catch(function (error) {
        console.log(error);

        if (error.response) {
          // alert
          currentObj.alertColor = "danger"
          currentObj.alertText = error.response.data.error
          currentObj.alert = true
        }
        
      });
    }
  }, // end of methods
}
</script>
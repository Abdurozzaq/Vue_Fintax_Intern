<template>
  <div>
    <!-- Komunikasi Parent Ke Child -->
    <!-- Nested Component -->
    <!-- ada juga di setiap page yang butuh Alert Component -->
    <Alert class="mx-auto mt-5" style="width: 60vw;" v-if="alert == true" :color="alertColor" :text="alertText" />

    <div class="card mx-auto mt-5" style="width: 60vw;">
      <div class="card-body">
        <h5 class="card-title">Register</h5>
        <form @submit.prevent="register" >
          <div class="form-group">
            <label for="InputEmail1">Email</label>
            <input v-model="email" type="email" class="form-control" id="InputEmail1" aria-describedby="emailHelp">
            <small id="emailHelp" class="form-text text-muted">Email harus valid.</small>
          </div>
          <div class="form-group">
            <label for="InputPassword1">Password</label>
            <input v-model="password" type="password" class="form-control" id="InputPassword1">
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Alert from'../../../components/Alert.vue'
export default {
  components: {
    Alert
  },

  data() {
    return {
      email: "eve.holt@reqres.in",
      password: "pistol",

      // Alert
      alert: false,
      alertColor: "",
      alertText: "",
    }
  }, // end of data

  methods: {
    register: function() {
      let currentObj = this

      axios.post('https://reqres.in/api/register', {
        email: currentObj.email,
        password: currentObj.password
      })
      .then(function (response) {
        console.log(response);
        currentObj.email = ""
        currentObj.password = ""

        // alert
        currentObj.alertColor = "success"
        currentObj.alertText = "Berhasil Register! Redirecting..."
        currentObj.alert = true

        // get bearer token nya
        const token = response.data.token

        // add bearer token to localstorage
        localStorage.setItem('userToken', token)

        // add bearer token to default axios headers
        // untuk saat page belum di reload
        if (token) {
          axios.defaults.headers.common['Authorization'] = 'Bearer' + ' ' + token
        }

        setTimeout(function() { 
          currentObj.$router.push({ path: '/dash' }) 
        }, 3000);
        

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
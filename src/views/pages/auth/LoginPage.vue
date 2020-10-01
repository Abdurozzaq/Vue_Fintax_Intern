<template>
  <div>
    <div class="card mx-auto mt-5" style="width: 60vw;">
      <div class="card-body">
        <h5 class="card-title">Login</h5>
        <form @submit.prevent="login" >
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

export default {
  data() {
    return {
      email: "eve.holt@reqres.in",
      password: "cityslicka",

      // Alert
      alert: false,
      alertColor: "",
      alertText: "",
    }
  }, // end of data

  methods: {
    login: function() {
      let currentObj = this

      axios.post('https://reqres.in/api/login', {
        email: currentObj.email,
        password: currentObj.password
      })
      .then(function (response) {
        console.log(response);

        currentObj.email = ""
        currentObj.password = ""

        // alert
        currentObj.alertColor = "success"
        currentObj.alertText = "Berhasil Login! Sekarang Redirecting... "
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

        currentObj.$router.push('/dash')

      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }, // end of methods

}
</script>
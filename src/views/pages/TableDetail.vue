<template>
  <div>
    <div class="card mx-auto mt-5" style="width: 60vw;">
      <div class="card-body">
        <img :src="pegawai.avatar" :alt="'foto' + pegawai.first_name" class="mx-auto d-block mb-3 img-thumbnail">

        <table class="mx-auto">
          <tr>
            <td>
              <p class="mx-3">First Name</p>
            </td>

            <td>
              <p>:</p>
            </td>

            <td>
              <p class="mx-3">{{ pegawai.first_name }}</p>
            </td>
          </tr>

          <tr>
            <td>
              <p class="mx-3">Last Name</p>
            </td>

            <td>
              <p>:</p>
            </td>

            <td>
              <p class="mx-3">{{ pegawai.last_name }}</p>
            </td>
          </tr>

          <tr>
            <td>
              <p class="mx-3">Email</p>
            </td>

            <td>
              <p>:</p>
            </td>

            <td>
              <p class="mx-3">{{ pegawai.email }}</p>
            </td>
          </tr>
        </table>

        <button @click.prevent="goBackToList" type="button" class="btn btn-primary">Kembali Ke List</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      pegawai: ""
    }
  }, 

  methods: {
    getPegawai: function() {
      let currentObj = this

      var pegawaiId = currentObj.$route.params.pegawaiId

      axios.get('https://reqres.in/api/users/' + pegawaiId)
        .then(function (response) {
          console.log(response);

          currentObj.pegawai = response.data.data
          
        })
    },

    goBackToList: function() {
      let currentObj = this

      currentObj.$router.push('/list')
    }
  }, // end of methods

  mounted: function() {
    let currentObj = this

    currentObj.getPegawai()
  }
}
</script>
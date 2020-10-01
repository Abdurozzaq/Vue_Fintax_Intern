<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Dashboard</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="/dash">Tambah Pegawai</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/list">List Pegawai</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/calculator">Calculator</a>
          </li>
        </ul>
        <span class="navbar-text">
          <button @click.prevent="logout" type="button" class="btn btn-light">Logout</button>
        </span>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    logout: function() {
      let currentObj = this
      // delete bearer token dari localstorage untuk logout
      localStorage.removeItem('userToken')
      
      currentObj.$router.push({ path: '/' })
    }
  }
}
</script>
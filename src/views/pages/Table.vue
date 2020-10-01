<template>
  <div>
    <div class="card mx-auto mt-5" style="width: 60vw;">
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th scope="col"><button @click="sort('first_name')" type="button" class="btn btn-link">First Name</button></th>
              <th scope="col"><button @click="sort('last_name')" type="button" class="btn btn-link">Last Name</button></th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pg, index) in sortedPegawai" :key="index">
              <td>{{ pg.first_name }}</td>
              <td>{{ pg.last_name }}</td>
              <td>
                <button @click.prevent="goToDetail(pg.id)" type="button" class="btn btn-primary">Lihat Detail</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="btn-group" role="group" aria-label="pageSize">
          <button @click.prevent="totalRecord3" type="button" class="btn btn-secondary">3</button>
          <button @click.prevent="totalRecord5" type="button" class="btn btn-secondary">5</button>
          <button @click.prevent="totalRecord10" type="button" class="btn btn-secondary">10</button>
          <button  @click.prevent="totalRecordAll" type="button" class="btn btn-secondary">Semua</button>
        </div>
        <button v-if="pageSize < pegawai.length" type="button" class="btn btn-success ml-3" @click="prevPage">Previous</button> 
        <button v-if="pageSize < pegawai.length" type="button" class="btn btn-success ml-3" @click="nextPage">Next</button>
        <p class="ml-3 mt-3">Halaman : {{ currentPage }}</p>
        <p class="ml-3 mt-3">Item Per Halaman : {{ pageSize }}</p>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  data() {
    return {
      pegawai: [],
      totalPages: 2,

      // tabel
      currentSort:'first_name',
      currentSortDir:'asc',
      pageSize: 3,
      currentPage: 1
    }
  }, // end of data

  computed: {
    sortedPegawai: function() {
      let currentObj = this
      return currentObj.pegawai.sort((a,b) => {
        let modifier = 1;
        if(currentObj.currentSortDir === 'desc') modifier = -1;
        if(a[currentObj.currentSort] < b[currentObj.currentSort]) return -1 * modifier;
        if(a[currentObj.currentSort] > b[currentObj.currentSort]) return 1 * modifier;
        return 0;
      }).filter((row, index) => {
        let start = (this.currentPage-1)*this.pageSize;
        let end = this.currentPage*this.pageSize;
        if(index >= start && index < end) return true;
      });
    }
  },

  methods: {
    // Request Untuk Get Data Dummy dari reqes.in dulu
    // tapi langsung 2 page dijadikan satu
    // karena memeang task nya total record 3, 5, 10, dan semua
    // jadi saya ambil lah semua aja karena memang di api itu
    // hanya ada 12 items
    getData: function() {
      let currentObj = this

      var page = 1

      for (var i = 1; i <= currentObj.totalPages; i++) {
        axios.get('https://reqres.in/api/users', { params: { page: page++ } })
          .then(function (response) {
            console.log(response);

            // currentObj.totalPages = response.data.total_pages;
            
            response.data.data.forEach((value) => {
                currentObj.pegawai.push(value);
            });

          })
      }
    }, // end of getData()

    sort: function(sortbycol) {
      //if sortby == current sort, reverse
      if(sortbycol === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = sortbycol;
    }, // end of sort

    goToDetail: function(pegawaiId) {
      let currentObj = this

      // kalau query tinggal ganti saja "params" jadi "query"
      currentObj.$router.push({ path: '/list/detail', params: { pegawaiId: pegawaiId } })
    }, // end of goToDetail()

    nextPage:function() {
      if((this.currentPage*this.pageSize) < this.pegawai.length) this.currentPage++;
    }, // end of nextPage()

    prevPage:function() {
      if(this.currentPage > 1) this.currentPage--;
    }, // end of prevPage()

    totalRecord3: function() {
      let currentObj = this

      currentObj.pageSize = 3
      currentObj.currentPage = 1
    }, // end of totalRecord3

    totalRecord5: function() {
      let currentObj = this

      currentObj.pageSize = 5
      currentObj.currentPage = 1
    }, // end of totalRecord5

    totalRecord10: function() {
      let currentObj = this

      currentObj.pageSize = 10
      currentObj.currentPage = 1
    }, // end of totalRecord10

    totalRecordAll: function() {
      let currentObj = this

      currentObj.pageSize = currentObj.pegawai.length
      currentObj.currentPage = 1
    }, // end of totalRecord3
  }, // end of methods

  mounted: function () {
    let currentObj = this

    currentObj.getData();
  }
}
</script>

import Vue from 'vue'
import VueRouter from 'vue-router'

// Multiguard untuk memakai dua nav guard pada satu route
import multiguard from 'vue-router-multiguard';

// layouts
import AuthLayout from '../views/layouts/AuthLayout.vue'
import MainLayout from '../views/layouts/MainLayout.vue'

// pages
import LoginPage from '../views/pages/auth/LoginPage.vue'
import RegisterPage from '../views/pages/auth/RegisterPage.vue'
import TambahPegawai from '../views/pages/TambahPegawai.vue'
import Calculator from '../views/pages/Calculator.vue'
import Table from '../views/pages/Table.vue'
import TableDetail from '../views/pages/TableDetail.vue'


Vue.use(VueRouter)

const pageTitle = (to, from, next) => {
  document.title = to.meta.title
  next()
}

/**
 *
 * For Authenticated
 * And Not Authenticated
 *
 * Guard
 */
const ifAuthenticated = (to, from, next) => {
  if (localStorage.getItem('userToken')) {
      next()
      return
  } else {
      next('/')
  }
}

const ifNotAuthenticated = (to, from, next) => {
  if (localStorage.getItem('userToken') == null) {
    next()
  } else {
    next('/dash')
  }
}

const routes = [
  {
    path: "",
    component: AuthLayout,
    children: [
      {
          path: "",
          meta: {
              title: 'Login - App Pegawaian',
          },
          component: LoginPage,
          beforeEnter: multiguard([pageTitle, ifNotAuthenticated])
      },
      {
        path: "/register",
        meta: {
            title: 'Register - App Pegawaian',
        },
        component: RegisterPage,
        beforeEnter: multiguard([pageTitle, ifNotAuthenticated])
    },
    ]
  },

  {
    path: "/dash",
    component: MainLayout,
    children: [
      {
          path: "",
          meta: {
              title: 'Tambah Pegawai - App Pegawaian',
          },
          component: TambahPegawai,
          beforeEnter: multiguard([pageTitle, ifAuthenticated])
      },
      {
        path: "/calculator",
        meta: {
            title: 'Simple SUM Calculator - App Pegawaian',
        },
        component: Calculator,
        beforeEnter: multiguard([pageTitle, ifAuthenticated])
      },
      {
        path: "/list",
        meta: {
            title: 'Tabel List Pegawai - App Pegawaian',
        },
        component: Table,
        beforeEnter: multiguard([pageTitle, ifAuthenticated])
      },
      {
        path: "/list/detail/:pegawaiId",
        meta: {
            title: 'Detail Pegawai - App Pegawaian',
        },
        component: TableDetail,
        beforeEnter: multiguard([pageTitle, ifAuthenticated])
      },
    ]
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

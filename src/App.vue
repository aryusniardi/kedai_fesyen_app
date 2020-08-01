<template>
  <v-app>
    <!-- component header -->
    <CHeader />

    <!-- component sidebar -->
    <CSidebar />

    <!-- main content -->
    <v-main>
      <v-slide-y-transition mode="out-in">
        <router-view></router-view>
      </v-slide-y-transition>
    </v-main>

    <!-- component footer -->
    <CFooter />

    <CAlert />

    <keep-alive>
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialogbottom-transition">
        <component :is="currentComponent"></component>
      </v-dialog>
    </keep-alive>
  </v-app>
</template>

<style lang="sass">
  $color-pack: false

  @import './assets/styles/style.scss'
</style>

<script>
import CHeader from './components/CHeader'
import CFooter from './components/CFooter'
import CSidebar from './components/CSidebar'
import CAlert from './components/CAlert'
import Search from './views/Search'
import Login from './views/auth/Login'
import Register from './views/auth/Register'
import Cart from './views/Cart'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',

  components: {
    CHeader,
    CFooter,
    CSidebar,
    CAlert,
    Search,
    Login,
    Register,
    Cart
  },
  methods: {
    ...mapActions({
      setStatusDialog: 'dialog/setStatus'
    })
  },
  computed: {
    ...mapGetters({
      statusDialog: 'dialog/status',
      currentComponent: 'dialog/component'
    }),
    dialog: {
      get() {
        return this.statusDialog
      },
      set(value) {
        this.setStatusDialog(value)
      }
    }
  }
};
</script>

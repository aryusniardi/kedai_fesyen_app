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

export default {
  name: 'App',

  components: {
    CHeader,
    CFooter,
    CSidebar,
  },

  data: () => ({
    //
  }),
};
</script>

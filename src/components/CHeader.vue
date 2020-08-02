<template>
  <v-app-bar color="white" flat dense max-height="75">

    <!-- Navigation Toggle -->
    <v-app-bar-nav-icon v-if="isHome && !guest" @click="setSidebar(!sidebar)"></v-app-bar-nav-icon>

    <!-- Previous Page -->
    <v-btn v-if="!isHome" icon @click="$router.go(-1)">
      <v-icon>arrow_back_ios</v-icon>
    </v-btn>

    <v-spacer v-if="!guest || isHome"></v-spacer>

    <!-- Title -->
    <v-img
      :src="require('@/assets/kedai_fesyen_icon.png')"
      contain
      height="42"
      width="42"
      max-width="48"
      @click="$vuetify.goTo(0)"
    />
    <v-toolbar-title>Kedai Fesyen</v-toolbar-title>
    
    <v-spacer v-if="isHome || !guest"></v-spacer>
    
    <!-- Button Cart -->
    <v-btn v-if="!guest" icon @click="cart()">
      <v-badge right overlap color="red">
        <span slot="badge" v-if="countCart > 0">{{countCart}}</span>
        <span slot="badge" v-else>0</span>
        <v-icon>shopping_cart</v-icon>
      </v-badge>
    </v-btn>

    <!-- Register & Login Button -->
    <template v-if="guest && isHome">
      <v-btn text x-small color="primary" class="capitalize" @click="register()">
        Register 
      </v-btn>

      <v-btn outlined color="primary" x-small class="capitalize" @click="login()">
        Login
      </v-btn>
    </template>

    <!-- Search Text Field -->
    <v-text-field
      v-if="isHome" 
      @click="search()"
      slot="extension"
      hide-details
      append-icon="mic" 
      label="Search" 
      prepend-inner-icon="search" 
      dense
      solo
      single-line
      clearable
      type="text"
    ></v-text-field>
  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'c-header',
  methods: {
    ...mapActions({
      setSidebar: 'setSidebar',
      setStatusDialog: 'dialog/setStatus',
      setComponent: 'dialog/setComponent',
    }),
    search() {
      this.setStatusDialog(true)
      this.setComponent('search')
      this.setSidebar(false)
    },
    cart() {
      this.setStatusDialog(true)
      this.setComponent('cart')
      this.setSidebar(false)
    },
    login() {
      this.$router.push({name: 'login'})
    },
    register() {
      this.$router.push({name: 'register'})
    },
  },
  computed: {
    ...mapGetters({
      sidebar: 'sidebar',
      countCart: 'cart/count',
      guest: 'auth/guest'
    }),
    isHome() {
      return (this.$route.path === '/')
    }
  }
}
</script>
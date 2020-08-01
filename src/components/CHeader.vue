<template>
<div>
  <v-app-bar
    clipped-left
    dark
    dense>
    <v-app-bar-nav-icon v-if="isHome && !guest" @click="setSidebar(!sidebar)"></v-app-bar-nav-icon>

    <v-btn v-if="!isHome" icon @click="$router.go(-1)">
      <v-icon>arrow_back</v-icon>
    </v-btn>

    <v-spacer v-if="!guest"></v-spacer>

      <v-img
        :src="require('@/assets/kedai_fesyen_icon.png')"
        contain
        height="42"
        width="42"
        max-width="48"
        @click="$vuetify.goTo(0)"
      />
      <v-toolbar-title>Kedai Fesyen</v-toolbar-title>

      <v-spacer></v-spacer>

    <v-btn v-if="!guest" icon @click="cart()">
      <v-badge right overlap color="red">
        <span slot="badge" v-if="countCart > 0">{{countCart}}</span>
        <span slot="badge" v-else>0</span>
        <v-icon>shopping_cart</v-icon>
      </v-badge>
    </v-btn>

    <template v-if="guest && isHome">
      <v-btn text x-small color="white" class="capitalize" @click="register()">
        Register 
        <!-- <v-icon right light>person_add</v-icon> -->
      </v-btn>

      <v-btn outlined color="white" x-small class="capitalize" @click="login()">
        Login
         <!-- <v-icon right light>lock_open</v-icon> -->
      </v-btn>
    </template>

    <v-text-field
      v-if="isHome" 
      @click="search()"
      slot="extension" 
      hide-details
      append-icon="mic" 
      text 
      label="Search" 
      prepend-inner-icon="search" 
      solo
      flat
      dense
      outlined
      clearable
      solo-inverted
      type="text"
    ></v-text-field>

  </v-app-bar>
  </div>
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
        this.setStatusDialog(true)
        this.setComponent('login')
        this.setSidebar(false)
      },
      register() {
        this.setStatusDialog(true)
        this.setComponent('register')
        this.setSidebar(false)
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
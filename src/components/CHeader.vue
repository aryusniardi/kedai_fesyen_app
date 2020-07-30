<template>
<div>
  <v-app-bar 
    light 
    flat 
    dense 
    class="bg-light">
    <v-app-bar-nav-icon v-if="isHome" @click="setSidebar(!sidebar)"></v-app-bar-nav-icon>
    <v-btn v-if="!isHome" icon @click="$router.go(-1)">
      <v-icon>arrow_back</v-icon>
    </v-btn>

    <v-spacer></v-spacer>

      <v-toolbar-title>Kedai Fesyen</v-toolbar-title>
      <v-img
        :src="require('@/assets/kedai_fesyen_icon.png')"
        contain
        height="42"
        width="42"
        max-width="48"
        @click="$vuetify.goTo(0)"
      />

      <v-spacer></v-spacer>

    <v-btn icon @click="cart()">
      <v-badge right overlap color="red">
        <!-- <span slot="badge" v-if="countCart > 0">{{countCart}}</span> -->
        <!-- <span slot="badge" v-else>0</span> -->
        <span slot="badge">0</span>
        <v-icon>shopping_cart</v-icon>
      </v-badge>
    </v-btn>

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
      setComponent: 'dialog/setComponent'
    }),
    search() {
      this.setStatusDialog(true)
      this.setComponent('search')
      this.setSidebar(false)
    }
  },
  computed: {
    ...mapGetters({
      sidebar: 'sidebar',
    }),
    isHome() {
      return (this.$route.path === '/')
    }
  }
}
</script>
<template>
  <v-navigation-drawer 
    light 
    v-model="drawer" 
    absolute 
    temporary 
    fixed 
    clipped 
    class="bg-light">
    <v-toolbar light>
      <!-- Closed Navigation Button -->
      <v-btn icon light @click="drawer=false">
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-title>Kedai Fesyen</v-toolbar-title>
    </v-toolbar>

    <v-list>
      <!-- Register Button -->
      <v-list-item>
        <v-btn depressed block rounded color="secondary">
          Register <v-icon right light>person_add</v-icon>
        </v-btn>
      </v-list-item>
      
      <!-- Login Button -->
      <v-list-item>
        <v-btn depressed block rounded color="secondary">
          Login <v-icon right light>lock_open</v-icon>
        </v-btn>
      </v-list-item>
    </v-list>

    <v-list dense>
      <v-divider></v-divider>

      <!-- Navigation Menu -->
      <v-list-item 
      v-for="(item, index) in items" 
      :key="index" 
      :href="item.route" 
      :to="{name: item.route}">
        <v-list-item-action>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{item.title}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'sidebar',
    data () {
      return {
        items: [
          { title: 'Home', icon: 'dashboard', route: 'home' },
          { title: 'Profile', icon: 'account_box', route: 'profile' },
          { title: 'About', icon: 'gavel', route: 'about' },
        ],
      }
    },
    computed: {
      ...mapGetters({
        sidebar: 'sidebar',
      }),
      drawer: {
        get() {
          return this.sidebar
        },
        set(value) {
          this.setSidebar(value)
        }
      }
    },
    methods: {
      ...mapActions({
        setSidebar: 'setSidebar'
      })
    }
  }
</script>
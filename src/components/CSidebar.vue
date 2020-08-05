<template>
  <v-navigation-drawer 
    light 
    v-model="drawer" 
    absolute 
    clipped 
    dense>

    <v-toolbar light flat>
        <v-btn icon light dark--text @click="drawer=false">
            <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Bookstore</v-toolbar-title>
    </v-toolbar>

    <v-list v-if="!guest">
      <v-list-item two-line>
        <v-list-item-avatar>
          <img v-if="user.avatar == null" src="https://randomuser.me/api/portraits/men/81.jpg">
          <img v-else :src="getImage('/avatar/' + user.avatar)">
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="capitalize">{{user.name}}</v-list-item-title>
          <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>

        </v-list-item-content>
      </v-list-item>
      
      <div class="px-4 ">
        <v-btn small rounded outlined block color="error" class white--text @click.stop="logout()">
          Logout
          <v-icon small right dark> settings_power</v-icon>
        </v-btn>
      </div>
    </v-list>
    <v-list dense>
      <!-- Navigation Menu -->
      <template v-for="(item, index) in items">
        <v-list-item 
          v-if="!item.auth || (item.auth && !guest)"
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
      </template>
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
          { title: 'Home', icon: 'home', route: 'home' },
          { title: 'Profile', icon: 'perm_identity', route: 'profile'},
          { title: 'My Order', icon: 'history', route: 'my-order'},
          { title: 'About', icon: 'help', route: 'about' },
        ],
      }
    },
    computed: {
      ...mapGetters({
        sidebar: 'sidebar',
        user: 'auth/user',
        guest: 'auth/guest',
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
        setSidebar: 'setSidebar',
        setAlert: 'alert/set',
        setStatusDialog: 'dialog/setStatus',
        setComponent: 'dialog/setComponent',
        setAuth: 'auth/set'
      }),
      logout() {
        let config = {
          headers: {
            'Authorization' : 'Bearer ' + this.user.api_token,
          }
        }
        this.setSideBar(false)
        this.axios.post('/logout', {}, config) 
        .then(() => {
          this.setAuth({})
          this.setAlert({
            status: true,
            text: 'Logout Successfully',
            type: 'success'
          })
        })
        .catch((error) => {
          let responses = error.message
          this.setAlert({
            status: true,
            text: responses.data.error,
            type: 'error'
          })
        })
      }
    }
  }
</script>
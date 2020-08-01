<template>
  <v-navigation-drawer 
    light 
    v-model="drawer" 
    absolute 
    clipped 
    dense>
    <v-toolbar dark>
      <!-- Closed Navigation Button -->
      <v-btn icon dark @click="drawer=false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list v-if="!guest">
      <v-list-item>
        <v-list-item-avatar>
          <img v-if="user.avatar == null" :src="getImage('/unavailable.png')">
          <img v-else :src="getImage('/users/' + user.avatar)">
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{user.name}}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-btn block small rounded depressed color="error lighten-1" class white--text @click.stop="logout()">
          Logout
          <v-icon small right dark> settings_power</v-icon>
        </v-btn>
      </v-list-item>
    </v-list>

    <v-list dense>
      <v-divider></v-divider>

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
          { title: 'Home', icon: 'dashboard', route: 'home' },
          { title: 'Profile', icon: 'account_box', route: 'profile'},
          { title: 'My Order', icon: 'shop_two', route: 'my-order'},
          { title: 'About', icon: 'gavel', route: 'about' },
        ],
      }
    },
    computed: {
      ...mapGetters({
        sidebar: 'sidebar',
        user: 'auth/user',
        guest: 'auth/guest'
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

        this.axios.post('/logout', {}, config) 
        .then(() => {
          this.setAuth({})
          this.setAlert({
            status: true,
            text: 'Logout Successfully',
            type: 'success'
          })
          this.setSideBar(false)
        })
        .catch((error) => {
          let responses = error.message
          this.setAlert({
            status: true,
            text: responses.data.message,
            type: 'error'
          })
        })
      }
    }
  }
</script>
<template>
  <v-app id="inspire">
    <v-main>
      <v-container
        class="fill-height transparent"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Register form</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                      large
                      target="_blank"
                      v-on="on"
                      @click="close"
                    >
                      <v-icon>close</v-icon>
                    </v-btn>
                  </template>
                  <span>Close</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                        name="Full Name"
                        prepend-icon="mdi-account"
                        type="text"
                        v-model="name" 
                        :rules="nameRules" 
                        label="Full Name" 
                        required 
                    ></v-text-field>
                    
                    <v-text-field
                        name="email"
                        prepend-icon="email"
                        type="text"
                        v-model="email" 
                        :rules="emailRules" 
                        label="Email" 
                        required 
                    ></v-text-field>

                    <v-text-field
                        id="password"
                        label="Password"
                        name="password"
                        prepend-icon="mdi-lock"
                        v-model="password" 
                        :append-icon="showPassword ? 'visibility' : 'visibility_off'" 
                        :rules="passwordRules" 
                        :type="showPassword ? 'text' : 'password'" 
                        hint="at least 6 character" 
                        @click:append="showPassword = !showPassword"
                    ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" :disabled="!valid" @click="submit">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'register',
    data() {
        return {
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 255) || 'Name must be less than 255 characters!'
            ],

            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /([a-zA-Z0-9_]{1,})(@)([a-zA-Z0-9_]{2,}).([a-zA-Z0-9_]{2,})+/.test(v) || 'E-mail must be valid'
            ],

            showPassword: false,
            password: '',
            passwordRules: [
                v => !!v || 'Password required',
                v => (v && v.length >= 6) || 'Min 6 Characters'
            ],
            checkbox: false
        }
    },
    computed: {
        ...mapGetters({
            user: 'auth/user'
        })
    },
    methods: {
        ...mapActions({
            setAlert: 'alert/set',
            setStatusDialog: 'dialog/setStatus',
            setAuth: 'auth/set'
        }),
        close() {
            this.setStatusDialog(false)
        },
        submit() {
            if(this.$refs.form.validate()) {
                let formData = new FormData()
                formData.set('name', this.name)
                formData.set('email', this.email)
                formData.set('password' , this.password)

                this.axios.post('/register', formData)
                .then((response) => {
                    let data_user = response.data.data
                    this.setAuth(data_user)
                    this.setAlert({
                        status: true,
                        text: 'Register successfully',
                        type: 'success'
                    })
                    this.close()
                })
                .catch((error) => {
                    console.log(error)
                    let responses = error.response
                    this.setAlert({
                        status: true,
                        text: responses.data.message,
                        type: 'error'
                    })
                })
            }
        },
        clear() {
            this.$refs.form.reset()
        }
    }
}
</script>
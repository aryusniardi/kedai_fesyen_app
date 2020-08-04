<template>
  <v-container>
    <v-col 
      class="mx-auto"
      cols="12"
      sm="8"
      md="6"
    >
      <v-card flat>
        <v-toolbar
          color="white"
          light
          flat
        >
          <v-toolbar-title><strong>Login form</strong></v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              name="email"
              prepend-icon="mdi-account"
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
              :rules="passwordRules" 
              :append-icon="showPassword ? 'visibility' : 'visibility_off'" 
              :type="showPassword ? 'text' : 'password'" 
              hint="At least 6 characters" 
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn block color="primary" :disabled="!valid" @click="submit">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'login',
    data() {
        return {
            valid: true,
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
        }
    },
    computed: {
        ...mapGetters({
            user: 'auth/user',
            prevUrl: 'prevUrl'
        })
    },
    methods: {
        ...mapActions({
            setAlert : 'alert/set',
            setStatusDialog : 'dialog/setStatus',
            setAuth : 'auth/set'
        }),
        close() {
          this.$router.push({name: 'home'})
        },
        submit() {
            if(this.$refs.form.validate()) {
                let formData = {
                    'email' : this.email,
                    'password' : this.password
                }
                this.axios.post('/login', formData) 
                .then((response) => {
                    let data_user = response.data.data
                    this.setAuth(data_user)
                    if (this.user.id > 0) {
                        this.setAlert({
                            status: true,
                            text: 'Login Success',
                            type: 'success'
                        })
                        this.$router.push({name: 'home'})
                    } else {
                        this.setAlert({
                            status: true,
                            text: 'Login Error',
                            type: 'error'
                        })
                    }
                })
                .catch((error) => {
                    let responses = error.response
                    console.log(responses.data.message)
                    this.setAlert({
                        status: true,
                        text: responses.data.error,
                        type: 'error'
                    })
                })
            }
        }
    },
}
</script>
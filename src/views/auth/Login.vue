<template>
    <v-card class="view-form">
        <v-toolbar light>
            <v-btn icon light @click="close">
                <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>

        <v-divider></v-divider>

        <v-container fluid>
            <v-form ref="form" v-model="valid" lazy-validation> 
                <!-- Text Field Email -->
                <v-text-field 
                    outlined 
                    v-model="email" 
                    :rules="emailRules" 
                    label="Email" 
                    required 
                    append-icon="email">
                </v-text-field>
                
                <!-- Text Field Password -->
                <v-text-field 
                    outlined 
                    v-model="password" 
                    :rules="passwordRules" 
                    :append-icon="showPassword ? 'visibility' : 'visibility_off'" 
                    :type="showPassword ? 'text' : 'password'" 
                    label="password" 
                    hint="At least 6 characters" 
                    @click:append="showPassword = !showPassword">
                </v-text-field>

                <div class="text-center">
                    <v-btn :disabled="!valid" @click="submit" block>
                        Login
                    </v-btn>
                </div>
            </v-form>
        </v-container>
    </v-card>
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
        })
    },
    methods: {
        ...mapActions({
            setAlert : 'alert/set',
            setStatusDialog : 'dialog/setStatus',
            setAuth : 'auth/set'
        }),
        close() {
            this.setStatusDialog(false)
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
                        if (this.prevUrl.length > 0) this.$router.push(this.prevUrl)
                            this.close()
                    } else {
                        this.setAlert({
                            status: true,
                            text: 'Login error',
                            type: 'error'
                        })
                    }
                })
                .catch((error) => {
                    let responses = error.response
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
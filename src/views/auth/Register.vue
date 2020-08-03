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
                <v-toolbar-title><strong>Register form</strong></v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                <v-row justify="space-around" class="py-5">
                    <template v-if="url_img">
                        <v-avatar height="100" width="100">
                            <img :src="url_img">
                        </v-avatar>
                    </template>
                </v-row>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <label class="file">
                        Choose Avatar
                        <br/>
                        <input required class="v_input input mt-3" type="file" id="gambar" name="avatar" ref="file" v-on:change="onChangeFileUpload()"/>
                    </label>
                    

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
                <v-btn block color="primary" :disabled="!valid" @click="submit">Register</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-container>
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

            avatar: [],
            rules: [
                value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
            ],

            gambar: '',
            url_img: null,

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
                formData.append('avatar', this.gambar)
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
                    this.$router.push({name: 'home'})
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
        },
        previewImage() {
            var input = event.target;
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.avatar = e.target.result;
                }
                reader.readAsDataURL(input.files[0]);
            }
            console.log(this.avatar)
        },
        onChangeFileUpload(){
            this.gambar = this.$refs.file.files[0];
            this.url_img = URL.createObjectURL(this.gambar);
        }
    }
}
</script>
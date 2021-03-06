<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6">
            <v-card flat>
                <v-toolbar
                    color="white" light flat>
                    <v-toolbar-title><strong>Edit Profile</strong></v-toolbar-title>
                </v-toolbar>

                <v-row justify="space-around" class="py-5">
                    <template v-if="url_img">
                        <v-avatar height="100" width="100">
                            <img :src="url_img">
                        </v-avatar>
                    </template>
                    <template v-else>
                        <v-avatar height="100" width="100">
                            <img v-if="user.avatar" :src="getImage('/avatar/' + user.avatar)">
                        </v-avatar>
                    </template>
                </v-row>
                
                <v-card-text>
                    <v-form ref="form" lazy-validation>                        
                        <v-text-field 
                            label="Name" 
                            v-model="name" 
                            required 
                            append-icon="person">
                        </v-text-field>
                        <v-text-field 
                            label="Email" 
                            v-model="email" 
                            required 
                            :rules="emailRules" 
                            append-icon="email">
                        </v-text-field>
                        <v-text-field
                            id="password"
                            label="Password"
                            name="password"
                            prepend-icon="mdi-lock"
                            v-model="password" 
                            required
                            :rules="passwordRules" 
                            :append-icon="showPassword ? 'visibility' : 'visibility_off'" 
                            :type="showPassword ? 'text' : 'password'" 
                            hint="At least 6 characters" 
                            @click:append="showPassword = !showPassword"
                        ></v-text-field>
                        <v-text-field
                            id="password_confirmation"
                            label="Confirm Password"
                            name="password_confirmation"
                            v-model="password_confirmation"
                            required
                            :rules="passwordRules" 
                            :append-icon="showPasswordConfirmation ? 'visibility' : 'visibility_off'" 
                            :type="showPasswordConfirmation ? 'text' : 'password'" 
                            hint="At least 6 characters" 
                            @click:append="showPasswordConfirmation = !showPasswordConfirmation"
                        ></v-text-field>
                        <v-textarea 
                            label="Adress" 
                            v-model="address" 
                            required 
                            auto-grow 
                            rows="3">
                        </v-textarea>
                        <v-text-field 
                            label="Phone" 
                            v-model="phone" 
                            required 
                            append-icon="phone">
                        </v-text-field>

                        <label class="file">
                            Choose Avatar
                            <br/>
                            <input 
                                required 
                                class="mt-3 btn" 
                                type="file" 
                                id="avatar" 
                                name="avatar" 
                                ref="file" 
                                v-on:change="onChangeFile()"/>
                        </label>

                        <v-select 
                            v-model="province_id" 
                            label="Province" 
                            :items="provinces"
                            item-text="province"
                            item-value="id" 
                            persistent-hint 
                            single-line
                            required
                        ></v-select>
                        <v-select 
                            label="city" 
                            v-model="city_id" 
                            v-if="province_id > 0" 
                            :items="citiesByProvince" 
                            item-text="city" 
                            item-value="id" 
                            persistent-hint 
                            single-line
                            required></v-select>
                    </v-form>
                </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="submit">
                    <v-icon> save</v-icon> &nbsp;
                    Save
                </v-btn>
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
    name: 'editprofile',
    data() {
        return {
            email: '',
            name: '',
            address: '',
            password: '',
            password_confirmation: '',
            url_img: null,
            phone: '',
            avatar: '',
            province_id: 0,
            city_id: 0,
            dialogConfirm: false,
            valid: true,
            showPassword: false,
            showPasswordConfirmation: false,
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /([a-zA-Z0-9_]{1,})(@)([a-zA-Z0-9_]{2,}).([a-zA-Z0-9_]{2,})+/.test(v) || 'E-mail must be valid'
            ],
            passwordRules: [
                v => !!v || 'Password required',
                v => (v && v.length >= 6) || 'Min 6 Characters'
            ],
        }
    },
    computed: {
        ...mapGetters({
            user: 'auth/user',
            sidebar: 'sidebar',
            provinces: 'region/provinces',
            cities: 'region/cities',
            prevUrl: 'prevUrl'
        }),
        citiesByProvince() {
            let province_id = this.province_id
            return this.cities.filter(function(city) {
                if (city.province_id == province_id) return city
            })
        },
    },
    methods: {
        ...mapActions({
            setSidebar: 'setSidebar',
            setAlert: 'alert/set',
            setAuth: 'auth/set',
            setProvinces: 'region/setProvinces',
            setCities: 'region/setCities',
        }),
        submit() {
            if (this.$refs.form.validate()) {
                this.avatar = this.$refs.file.files[0];
                this.url_img = URL.createObjectURL(this.avatar);

                let formData = new FormData()
                formData.set('name', this.name)
                formData.set('email', this.email)
                formData.set('avatar', this.avatar)
                formData.set('password' , this.password)
                formData.set('password_confirmation', this.password_confirmation)
                formData.set('address', this.address)
                formData.set('phone', this.phone)
                formData.set('province_id', this.province_id)
                formData.set('city_id', this.city_id)
                
                let config = {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + this.user.api_token
                    },
                }

                this.axios.post('/update-profile', formData, config)
                .then((response) => {
                    console.log(response)
                    this.logout()
                })
                .catch((error) => {
                    console.log(formData)
                    let responses = error.response
                    this.setAlert({
                        status: true,
                        text: responses.data.message,
                        type: 'error'
                    })
                })
                
                // this.onChangeFileUpload()
            }
        },
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
                this.$router.push({name: 'login'})
            })
            .catch((error) => {
                let responses = error.message
                this.setAlert({
                    status: true,
                    text: responses.data.message,
                    type: 'error'
                })
            })
        },
        onChangeFile(){
            this.avatar = this.$refs.file.files[0];
            this.url_img = URL.createObjectURL(this.avatar);    
        },
    },
    created() {
        this.name = this.user.name
        this.email = this.user.email
        this.address = this.user.address
        this.phone = this.user.phone
        this.city_id = this.user.city_id
        this.province_id = this.user.province_id

        if (this.provinces && this.provinces.length == 0) {
            this.axios.get('/provinces')
            .then((response) => {
                this.setProvinces(response.data.data)
            })
            this.axios.get('/cities')
            .then((response) => {
                this.setCities(response.data.data)
            })
        } 

        this.axios.get('/couriers')
        .then((response) => {
            this.couriers = response.data.data
        })
    }
  }
</script>
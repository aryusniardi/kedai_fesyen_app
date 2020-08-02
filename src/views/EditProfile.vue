<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6">
            <v-row justify="space-around" class="py-5">
                <template v-if="url_img">
                    <v-avatar height="100" width="100">
                        <img :src="url_img">
                    </v-avatar>
                </template>
            </v-row>
            <v-card>
                <v-toolbar
                    color="white" light flat>
                    <v-toolbar-title><strong>Edit Profile</strong></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn
                        @click="close"
                        icon
                        v-on="on">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>
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
                            v-model="password" 
                            :append-icon="showPassword ? 'visibility' : 'visibility_off'" 
                            :rules="passwordRules" 
                            :type="showPassword ? 'text' : 'password'" 
                            label="Password Baru" 
                            required
                            @click:append="showPassword = !showPassword">
                        </v-text-field>
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

                        <input required class="v_input input" type="file" id="gambar" name="avatar" ref="file" v-on:change="onChangeFileUpload()"/>

                        <v-select 
                            v-model="province_id" 
                            label="Province" 
                            :items="provinces"
                            item-text="province"
                            item-value="id" 
                            persistent-hint 
                            single-line
                        ></v-select>
                        <v-select label="city" v-model="city_id" v-if="province_id > 0" :items="citiesByProvince" item-text="city" item-value="id" persistent-hint single-line></v-select>
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
    data() {
        return {
            email: '',
            password: '',
            name: '',
            address: '',
            url_img: null,
            phone: '',
            gambar: '',
            province_id: 0,
            city_id: 0,
            dialogConfirm: false,
            valid: true,
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /([a-zA-Z0-9_]{1,})(@)([a-zA-Z0-9_]{2,}).([a-zA-Z0-9_]{2,})+/.test(v) || 'E-mail must be valid'
            ],
            showPassword: false,
            passwordRules: [
                v => !!v || 'Password required',
                v => (v && v.length >= 6) || 'Min 6 Characters'
            ],
        }
    },
    computed: {
        ...mapGetters({
            user: 'auth/user',
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
            setStatusDialog: 'dialog/setStatus',
            setAlert: 'alert/set',
            setAuth: 'auth/set',
            setProvinces: 'region/setProvinces',
            setCities: 'region/setCities',
        }),
        close() {
            this.setStatusDialog(false)
        },
        submit() {
            if (this.$refs.form.validate()) {
                let formData = {
                    'email': this.email,
                    'name': this.name,
                    'password': this.password,
                    'address': this.address,
                    'phone': this.phone,
                    'province_id': this.province_id,
                    'city_id': this.city_id
                }
                
                let config = {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + this.user.api_token
                    },
                }

                let dataForm = new FormData()
                dataForm.append('avatar', this.gambar)

                this.axios.post('/edit-image', dataForm, config)
                .then(() => {
                    console.log('updated image')
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

                this.axios.post('/update-profile', formData, config)
                .then((response) => {
                    this.setAuth(response.data.data)
                    this.setAlert({
                        status: true,
                        text: response.data.message,
                        type: 'success'
                    })
                    .catch((error) => {
                        let responses = error.response
                        this.setAlert({
                            status: true,
                            text: responses.data.error,
                            type: 'error'
                        })
                    })
                })
            }
        },
        onChangeFileUpload(){
            this.gambar = this.$refs.file.files[0];
            this.url_img = URL.createObjectURL(this.gambar);
        }
    },
    created() {
        this.name = this.user.name
        this.email = this.user.email
        this.password = this.user.password
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
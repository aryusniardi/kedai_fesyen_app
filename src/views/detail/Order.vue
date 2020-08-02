<template>
    <div>
        <v-container>
            <v-row>
                <v-col md="6" sm="12" xs="12">
                    <v-card>
                        <v-img 
                            v-if="product.image" 
                            position="center" 
                            :src="getImage('/product/' + product.image)" 
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="450"></v-img>
                    </v-card>
                </v-col>

                <v-col md="6" sm="12" xs="12">
                    <!-- <v-subheader class="title">Invoice Number : {{orders.invoice_number}}</v-subheader> -->
                    <v-simple-table>
                        <template v-slot:default>
                            <tbody>
                                <tr>
                                    <td colspan="3"><b>{{product.title}} </b></td>
                                </tr>
                                <tr v-for="(value, key) in orders" :key="key">
                                    <td v-if="value != orders.fashion_order"><strong>{{key}}</strong></td>
                                    <td v-if="value != orders.fashion_order">
                                        <strong v-if="value === orders.total_price" class="price-tag">Rp. {{orders.total_price.toLocaleString('id-ID')}}</strong>
                                        <strong v-else>{{value}}</strong>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    data() {
        return {
            orders: null,
            product: []
        }
    },
    computed: {
        ...mapGetters({
            user: 'auth/user',
        })
    },
    methods: {
        ...mapActions({
            setAlert: 'alert/set'
        })
    },
    mounted() {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + this.user.api_token,
                'Accept': 'application/json'
            },
        }
        
        let invoice_number = this.$route.params.invoice_number
        this.axios.get('/order/detail/' + invoice_number, config)
        .then((response) => {
            this.orders = response.data.data
            let product = this.orders.fashion_order[0]
            this.product = product
            console.log(this.product)
            console.log(this.orders)
        })
        .catch((error) => {
            let {data} = error.response
            this.setAlert({
                status: true,
                text: data.message,
                color: 'error'
            })
        })
    }
}
</script>
<template>
    <div>
        <v-container>
            <v-row v-for="(product, index) in product" :key="index">
                <v-col md="6" sm="12" xs="12" >
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
                                <tr>
                                    <td><strong>Store </strong></td>
                                    <td style="text-align: justify">
                                        <p class="mb-0 color-primary capitalize"><v-icon class="color-primary">store</v-icon> {{product.store}}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Price</strong></td>
                                    <td>
                                        <strong v-if="product.price" class="price-tag">Rp. {{product.price.toLocaleString('id-ID')}}</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Desc</strong></td>
                                    <td style="text-align: justify">
                                        <p>{{product.description}}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-col>
            </v-row>
            <v-row class="mt-4">
                <v-col md="12" sm="12" xs="12">
                    <!-- <v-subheader class="title">Invoice Number : {{orders.invoice_number}}</v-subheader> -->
                    <v-simple-table>
                        <template v-slot:default>
                            <tbody>
                                <tr>
                                    <td><b>Invoice Number</b></td>
                                    <td><b>Courier Service</b></td>
                                    <td colspan="3"><b>Total Price</b></td>
                                </tr>
                                <tr>
                                    <td>{{orders.invoice_number}}</td>
                                    <td>{{orders.courier_service}}</td>
                                    <td v-if="orders.total_price"><strong class="price-tag">Rp. {{orders.total_price.toLocaleString('id-ID')}}</strong></td>
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
    created() {
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
            let product = this.orders.fashion_order
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
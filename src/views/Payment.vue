<template>
    <div class="container">
        <v-subheader>Payment Information</v-subheader>
        <v-card flat>
            <v-container v-if="payment">
                <v-simple-table>
                    <tr><th>Order ID</th><td>{{ payment.order_id }}</td></tr>
                    <tr><th>Invoice Number</th><td>{{ payment.invoice_number }}</td></tr>
                    <tr><th>Total Bill</th><td v-if="payment.total_price">Rp. {{ this.payment.total_price.toLocaleString('id-ID') }}</td></tr>
                </v-simple-table>
            </v-container>
        </v-card>

        <v-subheader>Transfer To</v-subheader>
        <v-card flat>
            <v-container>
                <v-simple-table>
                    <tr>
                        <td><img src="img/bca.png" width="150"></td>
                        <td>BCA KCP abc No Rek 123</td>
                    </tr>
                    <tr>
                        <td><img src="img/mandiri.png" width="150"></td>
                        <td>MANDIRI KCP xyz No Rek 123</td>
                    </tr>
                </v-simple-table>
            </v-container>
        </v-card>

        <v-subheader></v-subheader>
        <v-card flat>
            <v-container>
                <v-layout row wrap>
                    <v-flex s12 text-center>
                        <v-btn color="success" @click="finish">Finish</v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            payment: 'payment',
            carts: 'cart/carts',
        }),
    },
    methods: {
        ...mapActions({
            setCart: 'cart/set',
            setAlert: 'alert/set',
            resetCart: 'cart/resetCartState'
        }),
        finish() {
            this.setAlert({
                status: true,
                text: 'Pembayaran Berhasil',
                type: 'success'
            })
            this.resetCart()
            this.$router.push('/')
        }
    },
    created() {
        console.log(this.payment)
        console.log(this.carts.length)
    }
}
</script>
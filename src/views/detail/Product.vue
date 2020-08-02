<template>
    <div>
        <v-container class="product-detail">
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
                    <p class="ml-3 mb-0 color-primary capitalize"><v-icon class="color-primary">store</v-icon> {{product.store}}</p>
                    <v-subheader class="title">{{product.title}}</v-subheader>
                    <v-simple-table>
                        <template v-slot:default>
                            <tbody>
                                <tr>
                                    <td><strong>Harga</strong></td>
                                    <td class="price-tag" v-if="product.price"><b>Rp. {{product.price.toLocaleString('id-ID')}} </b></td>
                                </tr>
                                <tr>
                                    <td><strong>Stok Barang</strong></td>
                                    <td>{{product.stock}}</td>
                                </tr>
                                <tr>
                                    <td><strong>Deskripsi</strong></td>
                                    <td style="text-align: justify">{{product.description}}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                    
                    <v-btn
                        class="mt-4 capitalize"
                        style="font-size: 14px !important;"
                        block
                        large
                        color="primary"
                        @click="buy"
                    > 
                        Tambah ke keranjang 
                        &nbsp;
                        <v-icon size="x-large" class="ml-3">add_shopping_cart</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            product: {},
        }
    },
    methods: {
        ...mapActions({
            addCart: 'cart/add',
            setAlert: 'alert/set',
            setStatusDialog: 'dialog/setStatus',
        }),
        buy() {
            if(!this.guest) {
                if(this.product.stock > 0) {
                    this.addCart(this.product),
                    this.setAlert({
                        status: true,
                        text: 'Added to Cart',
                        type: 'success'
                    })
                } else {
                    this.setAlert({
                        status: true,
                        text: 'Stock habis',
                        type: 'warning'
                    })
                    this.$router.push({name: 'home'})
                }
            } else {
                this.setAlert({
                    status: true,
                    text: 'Login terlebih dahulu',
                    type: 'error'
                })
                this.$router.push({name: 'login'})
            }
        },
        close() {
            this.setStatusDialog(false)
        },
    },
    computed: {
        ...mapGetters({
            guest: 'auth/guest',
            prevUrl: 'prevUrl'
        })
    },
    created() {
        let slug = this.$route.params.slug
        this.axios.get('/fashions/slug/' + slug)
        .then((response) => {
            let product = response.data.data
            this.product = product
        })
        .catch((error) => {
            let responses = error.response
            console.log(responses)
        })
    }
}
</script>
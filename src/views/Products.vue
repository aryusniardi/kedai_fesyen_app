<template>
    <div>
        <v-container grid-list-md>
            <v-subheader>
                <strong>
                    All Products
                </strong>
            </v-subheader>

            <v-layout row wrap>
                <v-flex v-for="(product, index) in products" xs12 sm6 lg4 :key="index">
                    <v-card
                        class="mx-auto pb-4"
                        max-width="400"
                        :to="'/product/' + product.slug"
                    >
                        <v-img
                        class="white--text align-end"
                        height="200px"
                        :src="getImage('/product/' + product.image)"
                        >
                        </v-img>

                        <v-card-title class="single-line">{{product.title}}</v-card-title>

                        <v-card-title class="price-tag">
                            <strong>
                            Rp. {{product.price.toLocaleString('id-ID')}}
                            </strong>
                        </v-card-title>

                        <v-card-actions class="px-0">
                            <v-card-subtitle class="pb-0 capitalize">
                                <v-icon>store</v-icon>
                                {{product.store}}
                            </v-card-subtitle>
                            
                            <v-spacer></v-spacer>

                            <v-card-subtitle class="pb-0">
                                Stock
                                ({{product.stock}})
                            </v-card-subtitle>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

        <template>
            <div class="text-xs-center">
                <v-pagination 
                    v-model="page" 
                    @input="go" 
                    :length="lengthPage" 
                    :total-visible="4"
                    prev-icon="mdi-menu-left"
                    next-icon="mdi-menu-right"
                    >
                </v-pagination>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {
            products: [],
            page: 1,
            lengthPage: 0
        }
    },
    methods: {
        go() {
            let url = '/fashions'
            if(this.page > 0) url = '/fashions?page=' + this.page;
            this.axios.get(url)
            .then((response) => {
                let response_data = response.data
                let products = response_data.data.data
                this.lengthPage = response_data.data.last_page
                this.products = products
            })
            .catch((error) => {
                console.log(error)
            })
        }
    },
    created() {
        this.go()
    }
}
</script>
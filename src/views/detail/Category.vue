<template>
    <div>
        <v-container grid-list-md>
            <v-subheader>{{category.name}}</v-subheader>
            <v-img v-if="category.image" :src="getImage('/categories/' + category.image)" height="250"></v-img>
            <v-subheader>Product by "{{category.name}}" category</v-subheader>

            <v-layout row wrap>
                <v-flex v-for="(product, index) in products" xs12 sm6 md4 lg3 :key="index">
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
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            category: {},
            products: [],
            page: 1,
            lengthPage: 0
        }
    },
    methods: {
        go() {
            let slug = this.$route.params.slug
            let url = '/categories/slug' + slug
            if(this.page > 0) url = url = '?page=' + this.page
            url = encodeURI(url)
            this.axios.get(url)
            .then((response) => {
                let response_data = response.data
                let category = response_data.data
                this.category = category
                this.products = category.product.data
                this.lengthPage = category.product.last_page
            })
        }
    }
}
</script>
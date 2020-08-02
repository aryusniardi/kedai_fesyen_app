<template>
    <div>
        <v-container grid-list-md class="category">
            <v-img class="category-image" v-if="category.image" :src="getImage('/categories/' + category.image)" height="250">
                <span>
                    {{category.name}}
                </span>
            </v-img>

            <v-subheader >Product by "<strong class="capitalize">{{category.name}}</strong>" category</v-subheader>

            <v-layout row wrap>
                <v-flex v-for="(product, index) in products" xs12 sm6 md4 lg3 :key="index">
                    <v-hover v-slot:default="{ hover }">
                        <v-card
                            :elevation="hover ? 12 : 2"
                            :class="{ 'on-hover': hover }"
                            class="mx-auto pb-4"
                            max-width="400"
                            :to="'/product/' + product.slug"
                        >
                            <v-img
                                class="white--text align-end"
                                height="200px"
                                :src="getImage('/product/' + product.image)"
                            ></v-img>

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
                    </v-hover>
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
            let url = '/categories/slug/' + slug
            if(this.page > 0) url = url + '?page=' + this.page
            url = encodeURI(url)
            this.axios.get(url)
            .then((response) => {
                let response_data = response.data
                let category = response_data.data
                this.category = category
                this.products = category.fashions.data
                this.lengthPage = category.fashions.last_page
            })
        }
    },
    created() {
        this.go()
    }
}
</script>
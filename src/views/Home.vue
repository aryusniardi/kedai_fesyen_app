<template>
  <div class="home">

    <!-- List Categories -->
    <v-container class="mt-4">
      <v-subheader>
        <strong>
          Top Category
        </strong>
        <v-spacer></v-spacer>
        <router-link to="/categories">
          See All
          <v-icon>navigate_next</v-icon>
        </router-link>
      </v-subheader>

      <v-row justify="space-around">
        <v-col cols="12">
          <v-sheet flat>
            <v-chip-group column>
              <v-chip 
                v-for="category in categories" 
                :key="category.id"
                :to="'/category/' + category.slug">
                {{ category.name }}
              </v-chip>
            </v-chip-group>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>

    <v-container grid-list-md>
      <v-subheader>
        <strong>
          Top Products
        </strong>
        <v-spacer></v-spacer>
        <router-link to="/products">
          See All
          <v-icon>navigate_next</v-icon>
        </router-link>
      </v-subheader>

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
          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    categories: [],
    products: []
  }),
  methods: {
    getImage(image) {
      if(image != null && image.length > 0) {
        return process.env.VUE_APP_BACKEND_URL + "/images" + image
      }
      return "/img/unavailable.jpg"
    }
  },
  created() {
    let count = 4
    this.axios.get('/categories/random/' + count)
    .then((response) => {
      let categories = response.data.data
      this.categories = categories
    })
    .catch((error) => {
      let responses = error.response
      console.log(responses)
    })

    count = 8
    this.axios.get('/fashions/top/' + count)
    .then((response) => {
      let products = response.data.data
      this.products = products
    })
    .catch((error) => {
      let responses = error.response
      console.log(responses)
    })
  }
}
</script>
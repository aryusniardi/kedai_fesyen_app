<template>
    <div class="categories">
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex v-for="category in categories" xs12 sm6 lg4 :key="category.id">
                    <v-hover v-slot:default="{ hover }">
                        <v-card
                            :elevation="hover ? 12 : 2"
                            :class="{ 'on-hover': hover }">
                            <v-img
                                :if="category.image"
                                :src="getImage('/categories/'+category.image)"
                                class="white--text align-end"
                                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                height="300px"
                                position="center"
                                >
                                <v-card-actions>
                                    <v-list-item class="grow">
                                        <v-spacer></v-spacer>
                                        <v-btn small depressed :to="'/category/' + category.slug">
                                            {{category.name}}
                                            <v-icon class="align-end ml-1">navigate_next</v-icon>
                                        </v-btn>
                                    </v-list-item>
                                </v-card-actions>
                            </v-img>
                        </v-card>
                    </v-hover>
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
            categories: [],
            page: 1,
            lengthPage: 0
        }
    },
    methods: {
        go() {
            let url = '/categories'
            if(this.page > 0) url = '/categories?page=' + this.page;
            this.axios.get(url)
            .then((response) => {
                let response_data = response.data.data
                let categories = response_data.data
                this.lengthPage = response_data.last_page
                this.categories = categories
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
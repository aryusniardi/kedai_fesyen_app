<template>
    <v-card>
        <v-toolbar light>
            <!-- Close Button -->
            <v-btn icon light @click.native="close">
                <v-icon>close</v-icon>
            </v-btn>

            <v-text-field 
                v-model="keyword" 
                @input="doSearch"
                hide-details
                append-icon="mic" 
                text 
                label="Search" 
                prepend-inner-icon="search" 
                solo
                flat
                dense
                outlined
                clearable
                type="text"
                ref="txtSearch"></v-text-field>
        </v-toolbar>

        <v-divider></v-divider>

        <v-list subheader>
            <v-subheader v-if="keyword.length > 0">
                Results for "{{keyword}}"
            </v-subheader>

            <v-alert :value="items.length == 0 && keyword.length > 0" color="warning">
                No results were found.
            </v-alert>
            
            <template v-for="(item) in items">
                <v-list-item
                    :key="item.id" 
                    @click="close" 
                    :to="'/fashion/' + item.slug"
                >
                    <v-list-item-avatar>
                        <img :src="getImage('/product/' + item.image)" alt="">
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-list>
    </v-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'search',
    data() {
        return {
            keyword: '',
            items: []
        }
    },
    methods: {
        ...mapActions({
            setStatusDialog: 'dialog/setStatus'
        }),
        close() {
            this.setStatusDialog(false)
        },
        doSearch() {
            let keyword = this.keyword
            if(keyword.length > 0) {
                this.axios.get('/fashions/search/' + keyword)
                .then((response) => {
                    let items = response.data.data
                    this.items = items
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        }
    },
    mounted() {
        if (this.$refs.txtSearch != undefined) {
            this.$nextTick(() => this.$refs.txtSearch.focus())
        }
    }
}
</script>
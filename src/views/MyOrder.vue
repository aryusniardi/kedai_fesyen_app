<template>
    <div>
        <v-subheader>History Belanja</v-subheader>
        <v-card flat>
            <v-container>
                <v-simple-table>
                    <tbody>
                        <tr v-for="item in items" :key="item.id">
                            <td>
                                <br>
                                Invoice: {{item.invoice_number}}
                                <div class="price-tag title">Rp. {{item.total_price.toLocaleString('id-ID')}}</div>
                                <small>Date: {{item.updated_at}}</small>
                            </td>
                            <td style="vertical-align: bottom">
                                <v-btn small outlined color="primary" class="capitalize" :to="'/order/' + item.invoice_number">
                                    Detail
                                <!-- {{item.status}} -->
                                    <v-icon class="align-end ml-1">navigate_next</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-container>
        </v-card>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    data() {
        return {
            items: []
        }
    },
    computed: {
        ...mapGetters({
            user: 'auth/user'
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
                'Authorization': 'Bearer ' + this.user.api_token
            }
        }

        this.axios.get('/my-order', config)
        .then((response) => {
            let {data} = response.data
            this.items = data
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
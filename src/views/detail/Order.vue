<template>
    <div>
        <v-subheader>{{item.invoice}}</v-subheader>
        <v-card flat>
            <v-container>
               Ini halaman detail order
            </v-container>
        </v-card>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            item: []
        }
    },
    computed: {
        ...mapGetters({
            user: 'auth/user'
        })
    },
    created() {
        console.log(this.user.api_token)
        
        let config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.user.api_token
            },
        }
        
        let invoice = this.$route.params.invoice_number
        this.axios.get('/order/detail/' + invoice, config)
        .then((response) => {
            let item = response
            this.item = item
        })
        .catch((error) => {
            let responses = error.response
            console.log(responses)
        })

        console.log(this.item)
    }
}
</script>
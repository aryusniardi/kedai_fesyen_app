<template>
    <div class="container">
        <v-subheader><strong>Your Profile</strong></v-subheader>
        <v-row justify="space-around" class="py-5">
            <v-avatar height="100" width="100">
                <img v-if="!user.avatar" src="https://randomuser.me/api/portraits/men/1.jpg">
                <img v-else :src="getImage('/avatar/' + user.avatar)">
            </v-avatar>
        </v-row> 
        <v-card flat>
            <v-simple-table>
                <tbody>
                    <tr>
                        <td><strong>ID</strong></td>
                        <td>{{user.id}}</td>
                    </tr>
                    <tr>
                        <td><strong>Name</strong></td>
                        <td class="capitalize">{{user.name}}</td>
                    </tr>
                    <tr>
                        <td><strong>Email</strong></td>
                        <td>{{user.email}}</td>
                    </tr>
                    <tr>
                        <td><strong>Phone</strong></td>
                        <td>{{user.phone}}</td>
                    </tr>
                    <tr>
                        <td><strong>Address</strong></td>
                        <td class="capitalize">{{user.address}}</td>
                    </tr>
                    <tr>
                        <td><strong>City ID</strong></td>
                        <td class="capitalize">{{user.city_id}}</td>
                    </tr>
                    <tr>
                        <td><strong>Province ID</strong></td>
                        <td class="capitalize">{{user.province_id}}</td>
                    </tr>
                </tbody>
            </v-simple-table>
            
        </v-card>
        <v-btn block color="primary" dark :to="'/profile/' + user.id" class="mt-4 capitalize">
            <v-icon class="mx-2">create</v-icon> &nbsp;
                Edit Profile
        </v-btn>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            user: 'auth/user',
        })
    },
    methods: {
        ...mapActions({
            setStatusDialog: 'dialog/setStatus',
            setComponent: 'dialog/setComponent',
            setAuth: 'auth/set',
        }),
    },
    created() {
        console.log(this.user)
    }
}
</script>
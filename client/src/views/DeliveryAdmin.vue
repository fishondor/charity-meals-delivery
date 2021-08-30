<template>
    <v-card>
        <v-tabs
            v-model="tab"
            align-with-title
            id="delivery-tabs"
        >
            <v-tabs-slider color="yellow"></v-tabs-slider>

            <v-tab
                v-for="item in items"
                :key="item.id"
                :id="item.id"
            >
                {{ item.label }}
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item
                key="groups"
            >
                <Groups />
            </v-tab-item>
            <v-tab-item
                key="carriers"
            >
                <Carriers />
            </v-tab-item>
            <v-tab-item
                key="data"
            >
                <Data />
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>
<script>
import Groups from '../components/Groups'
import Carriers from '../components/Carriers'
import Data from '../components/Data'
import Destination from '../models/Destination'

export default {
    components: {
        Groups,
        Carriers,
        Data
    },
    data: () => ({
        items: [
            {
                label: 'חלוקות',
                id: 'tab-groups'
            },
            {
                label: 'מחלקים',
                id: 'tab-carriers'
            },
            {
                label: 'מידע',
                id: 'tab-info'
            }
        ],
        tab: null,
    }),
    async created(){
        let user = await this.$firebaseService.getCurrentUser()
        let destinationsSnapshot = await this.$firebaseService.getDestinationsByOwner(user.uid)
        let destinations = Destination.fromSnapshot(destinationsSnapshot)
        this.$store.commit('setDestinations', destinations)
    },
}
</script>
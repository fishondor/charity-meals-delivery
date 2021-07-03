<template>
    <v-card>
        <v-tabs
            v-model="tab"
            align-with-title
        >
            <v-tabs-slider color="yellow"></v-tabs-slider>

            <v-tab
                v-for="item in items"
                :key="item"
            >
                {{ item }}
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

export default {
    title: "Friday Meals, Delivery admin",
    components: {
        Groups,
        Carriers,
        Data
    },
    data: () => ({
        items: [
            'חלוקות',
            'מחלקים',
            'מידע'
        ],
        tab: null,
    })
}
</script>
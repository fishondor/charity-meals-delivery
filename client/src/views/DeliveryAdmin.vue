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
                key="pickups"
            >
                <Pickups />
            </v-tab-item>
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
        </v-tabs-items>
    </v-card>
</template>
<script>
import Pickups from '../components/Pickups'
import Groups from '../components/Groups'
import Carriers from '../components/Carriers'

export default {
    components: {
        Pickups,
        Groups,
        Carriers
    },
    data: () => ({
        items: [
            'pickups',
            'groups',
            'carriers'
        ],
        tab: null,
    })
}
</script>
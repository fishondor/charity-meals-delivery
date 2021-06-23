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
                <TablePickups />
            </v-tab-item>
            <v-tab-item
                key="groups"
            >
                groups
            </v-tab-item>
            <v-tab-item
                key="carriers"
            >
                carriers
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>
<script>
import TablePickups from '../components/TablePickups'

export default {
    components: {
        TablePickups
    },
    data: () => ({
        items: [
            'pickups',
            'groups',
            'carriers'
        ],
        tab: null
    }),
}
</script>
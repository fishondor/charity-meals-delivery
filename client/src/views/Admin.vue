<template>
    <v-card>
        <v-tabs
            v-model="tab"
            align-with-title
            id="destinations-tabs"
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
                <TableDeliveries />
            </v-tab-item>
            <v-tab-item
                key="carriers"
            >
                <TableDestinations />
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>
<script>
import TableDeliveries from '../components/TableDeliveries.vue'
import TableDestinations from '../components/TableDestinations.vue'

export default {
    components: {
        TableDeliveries,
        TableDestinations
    },
    data: () => ({
        items: [
            {
                label: 'חלוקות',
                id: 'tab-deliveries'
            },
            {
                label: 'יעדים',
                id: 'tab-destinations'
            }
        ],
        tab: null,
    })
}
</script>
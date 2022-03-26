<template>
    <v-data-table
        :headers="headers"
        :items="carriers"
        sort-by="name"
        class="elevation-1 mb-10"
        :hide-default-footer="true"
        id="table-carriers"
    >
        <template v-slot:[`item.phone`]="{ item }">
            <div class="d-flex justify-space-between">
                <span>{{item.phone}}</span>
                <a :href="item.phone | whatsappMessageNumber">
                    <v-icon
                    >
                        {{icons.whatsapp}}
                    </v-icon>
                </a>
            </div>
        </template>
        <template v-slot:[`item.groups`]="{ item }">
            <template v-if="item.groups">
                <v-chip
                    v-for="group in item.groups" :key="item.id + group.id"
                    class="ma-2 carrier-group-indicator-item"
                    color="primary"
                >
                    {{group.index}}
                </v-chip>
            </template>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon
                class="carrier-item-delete"
                @click="deleteItem(item)"
            >
                {{icons.delete}}
            </v-icon>
        </template>
        <template v-slot:[`item.pickupsNumber`]="{ item }">
            <v-chip
                class="ma-2 carrier-pickups-number"
                color="primary"
                @click="updateNumberOfPickups(item)"
            >
                {{item.pickupsNumber}}
            </v-chip>
        </template>
        <template v-slot:[`item.time`]="{ item }">
            <v-btn text
                @click="updateDeliveryTime(item)"
            >
                {{item.time}}
            </v-btn>
        </template>
    </v-data-table>
</template>
<script>
import {
    whatsapp,
    deleteIcon
} from '../components/icons'

export default {
    props: {
        carriers: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data: () => ({
        headers: [
            { text: 'שם', value: 'name' },
            { text: 'טלפון', value: 'phone', sortable: false },
            { text: 'אימייל', value: 'email', sortable: false },
            { text: 'יכול מספר משלוחים', value: 'pickupsNumber', sortable: false },
            { text: 'שעה', value: 'time', sortable: false },
            { text: 'רשום ל', value: 'groups', class: 'carriers-table-groups-column' },
            { text: '', value: 'actions', sortable: false },
        ],
        icons: {
            whatsapp,
            delete: deleteIcon
        }
    }),
    methods: {
        deleteItem (item) {
            this.$emit('onDelete', item.id);
        },
        updateNumberOfPickups (item) {
            this.$emit('onUpdateNumberOfPickups', item)
        },
        updateDeliveryTime (item) {
            this.$emit('onUpdateDeliverytime', item)
        }
    }
}
</script>
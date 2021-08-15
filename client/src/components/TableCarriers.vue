<template>
    <v-data-table
        :headers="headers"
        :items="carriers"
        sort-by="name"
        class="elevation-1 mb-10"
        :hide-default-footer="true"
        id="table-carriers"
    >
        <template v-slot:item.phone="{ item }">
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
        <template v-slot:item.groups="{ item }">
            <template v-if="item.groups">
                <v-chip
                    v-for="group in item.groups" :key="item.id + group.id"
                    class="ma-2"
                    color="primary"
                >
                    {{group.index}}
                </v-chip>
            </template>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon
                @click="deleteItem(item)"
            >
                {{icons.delete}}
            </v-icon>
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
            { text: 'יכול מספר משלוחים', value: 'pickupsNumber', sortable: false},
            { text: 'רשום ל', value: 'groups'},
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
        }
    }
}
</script>
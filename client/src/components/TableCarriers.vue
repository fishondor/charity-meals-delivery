<template>
    <v-data-table
        :headers="headers"
        :items="carriers"
        sort-by="name"
        class="elevation-1 mb-10"
        :hide-default-footer="true"
    >
        <template v-slot:item.phone="{ item }">
            <div class="d-flex justify-space-between">
                <span>{{item.phone}}</span>
                <a :href="item.phone | whatsappLink">
                    <v-icon
                        small
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
                small
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
            { text: 'Name', value: 'name' },
            { text: 'Phone', value: 'phone', sortable: false },
            { text: 'Email', value: 'email', sortable: false },
            { text: 'Can do # deliveries', value: 'pickupsNumber', sortable: false},
            { text: 'Assigned', value: 'groups'},
            { text: '', value: 'actions', sortable: false },
        ],
        icons: {
            whatsapp,
            delete: deleteIcon
        }
    }),
    filters: {
        whatsappLink: function (value) {
            if (!value) return ''
            return 'https://wa.me/' + value.replace(/\D/g, "");
        }
    },
    methods: {
        deleteItem (item) {
            this.$emit('onDelete', item.id);
        }
    }
}
</script>
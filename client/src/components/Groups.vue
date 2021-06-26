<template>
    <v-container>
        <template v-if="groups.length">
            <TablePickups v-for="group in sortedGroups" :key="group.index"
                :group="group"
                @onDelete="deletePickup"
                @onSave="savePickup" />
        </template>
        <template v-else>
            <v-textarea
                outlined
                name="input-7-4"
                label="Paste exported spreadsheet here"
                v-model="exportedData"
            ></v-textarea>
            <v-btn
                color="primary"
                class="mr-4"
                @click="submit"
                >
                Import
            </v-btn>
        </template>
    </v-container>
</template>
<script>
import TablePickups from './TablePickups'

import Group from '../models/Group'

export default {
    components: {
        TablePickups
    },
    data: () => ({
        groups: [],
        exportedData: "",
        deliveryId: null,
        groupsRef: null
    }),
    created(){
        this.deliveryId = this.$route.params.id
        this.groupsRef = this.$firebaseService.getRef(this.deliveryId, 'groups')
        this.groupsRef.on('value', (snapshot) => {
            this.groups = Group.fromSnapshot(snapshot)
        });
    },
    methods: {
        submit: function(){
            let data = JSON.parse(this.exportedData);
            data.map(
                item => {
                    this.groupsRef.push(item)
                }
            )
        },

        savePickup (groupId, pickup) {
            this.groupsRef.child(`${groupId}/pickups`).push(pickup)
        },

        deletePickup (groupId, pickupId) {
            this.groupsRef.child(`${groupId}/pickups`).child(pickupId).remove();
        }
    },
    computed: {
        sortedGroups() {
            return this.groups.slice().sort(
                (a, b) => {
                    if(typeof a.index === 'undefined')
                        return 0;
                    return a.index - b.index
                }
            )
        }
    }
}
</script>
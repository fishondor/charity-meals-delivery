<template>
    <v-container>
        <template v-if="groups.length">
            <TablePickups v-for="group in sortedGroups" :key="group.index"
                :group="group"
                :carriers="carriers"
                @onDelete="deletePickup"
                @onSave="savePickup"
                @onCarrierChange="updateCarrier"
                :editable="true"
                :hideFooter="true" />
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
import Carrier from '../models/Carrier'

export default {
    components: {
        TablePickups
    },
    data: () => ({
        groups: [],
        carriers: [],
        exportedData: "",
        deliveryId: null,
        groupsRef: null,
        carriersRef: null
    }),
    created(){
        this.deliveryId = this.$route.params.id
        this.groupsRef = this.$firebaseService.getRef(this.deliveryId, 'groups')
        this.groupsRef.on('value', (snapshot) => {
            this.groups = Group.fromSnapshot(snapshot)
            this.setDisableCarriers()
        });
        this.carriersRef = this.$firebaseService.getRef(this.deliveryId, 'carriers')
        this.carriersRef.on('value', (snapshot) => {
            this.carriers = Carrier.fromSnapshot(snapshot)
            this.setDisableCarriers()
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
        },

        updateCarrier (groupId, carrierId) {
            this.groupsRef.child(groupId).update(
                {
                    carrier: carrierId
                }
            )
        },

        setDisableCarriers () {
            this.carriers = this.carriers.map(
                carrier => {
                    carrier.disabled = carrier.isDisabled(this.groups);
                    return carrier;
                }
            )
        },
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
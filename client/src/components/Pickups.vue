<template>
    <v-container>
        <TablePickups :group="group" @onSave="savePickup" @onDelete="deletePickup" />
    </v-container>
</template>
<script>
import TablePickups from './TablePickups'

import Pickup from '../models/Pickup'
import Group from '../models/Group'

export default {
    components: {
        TablePickups
    },
    data:() => ({
        group: new Group({
            pickups: {},
            description: 'Pickups',
            groupIndex: null,
            carrier: {}
        }),
        pickupsRef: null,
        deliveryId: '',
    }),

    created () {
        this.deliveryId = this.$route.params.id
        this.pickupsRef = this.$firebaseService.getRef(this.deliveryId, 'pickups')
        this.pickupsRef.on('value', (snapshot) => {
            this.$set(this.group, 'pickups', Pickup.fromSnapshot(snapshot))
        });
    },

    methods: {

        savePickup (group, pickup) {
            this.pickupsRef.push(pickup)
        },

        deletePickup (group, pickupId) {
            this.pickupsRef.child(pickupId).remove();
        }
    }
}
</script>
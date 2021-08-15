<template>
    <v-container>
        <v-dialog
            v-model="dialog"
            max-width="500px"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    >
                    הוסף חלוקה
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">חלוקה</span>
                </v-card-title>

                <v-card-text>
                    <FormGroup :indexes="groupsIndexes" @onSubmit="createSingleDelivery" />
                </v-card-text>
            </v-card>
        </v-dialog>
        <template v-if="groups.length">
            <div class="tables-pickups">
                <TablePickups v-for="group in sortedGroups" :key="group.index"
                    :group="group"
                    :carriers="carriers"
                    @onDelete="deletePickup"
                    @onSave="savePickup"
                    @onCarrierChange="updateCarrier"
                    :editable="true"
                    :hideFooter="true" />
            </div>
        </template>
        <template v-else>
            <v-textarea
                outlined
                name="import-groups"
                id="import-groups-input"
                label="Paste exported spreadsheet here"
                v-model="exportedData"
            ></v-textarea>
            <v-btn
                id="import-groups"
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
import FormGroup from './FormGroup'

import Group from '../models/Group'
import Carrier from '../models/Carrier'

export default {
    components: {
        TablePickups,
        FormGroup
    },
    data: () => ({
        groups: [],
        carriers: [],
        exportedData: "",
        deliveryId: null,
        groupsRef: null,
        carriersRef: null,
        dialog: false,
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

        closeSingleDeliveryDialog () {
            this.dialog = false
        },

        createSingleDelivery (data) {
            let group = new Group(data)
            this.groupsRef.push(group)
            this.closeSingleDeliveryDialog()
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
        },
        groupsIndexes() {
            return this.groups.map(
                item => item.index
            )
        }
    },
    watch: {
        dialog (val) {
            val || this.closeSingleDeliveryDialog()
        },
    },
}
</script>
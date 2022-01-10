<template>
    <v-container id="delivery-groups-list">
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
        <DialogSelectDestinations @onSelected="addDestinationsFromUserList" />
        <template v-if="groups.length">
            <div class="tables-pickups">
                <TablePickups v-for="group in sortedGroups" :key="group.index"
                    :group="group"
                    :carriers="carriers"
                    @onDelete="deletePickup"
                    @onSave="savePickup"
                    @onCarrierChange="updateCarrier"
                    @onDeleteGroup="deleteGroup"
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
        <v-dialog v-model="messageDialog.open" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">{{messageDialog.message}}</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="messageDialog.open = false">סגור</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
import TablePickups from './TablePickups'
import FormGroup from './FormGroup'
import DialogSelectDestinations from './DialogSelectDestinations.vue'

import Group from '../models/Group'
import Carrier from '../models/Carrier'

export default {
    components: {
        TablePickups,
        FormGroup,
        DialogSelectDestinations
    },
    data: () => ({
        groups: [],
        carriers: [],
        exportedData: "",
        deliveryId: null,
        groupsRef: null,
        carriersRef: null,
        dialog: false,
        messageDialog: {
            open: false,
            message: ""
        }
    }),
    async created(){
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

        addDestinationsFromUserList (destinations) {
            let currentIndexes = this.groups.map(
                group => group.index
            )
            let invalidIndexes = destinations.filter(
                destination => currentIndexes.includes(destination.index)
            ).map(
                destination => destination.index
            )
            if(invalidIndexes.length){
                this.messageDialog.message = `מספרי היעדים הבאים כבר קיימים ולכן לא ניתן להוסיפם בשנית: ${invalidIndexes.join(", ")}`
                this.messageDialog.open = true
            }
                
            destinations.map(
                destination => invalidIndexes.includes(destination.index) || this.groupsRef.push(Group.fromDestination(destination))
            )
        },

        deleteGroup (groupId) {
            this.groupsRef.child(groupId).remove();
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
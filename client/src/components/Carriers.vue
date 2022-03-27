<template>
    <v-container fluid>
        <TableCarriers 
            :carriers="carriers" 
            @onDelete="deleteItem"
            @onUpdateNumberOfPickups="updateNumberOfPickupsDialog"
            @onUpdateDeliverytime="updateDeliveryTimeDialog" />
        <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card class="carrier-delete-modal">
                <v-card-title v-if="!groupsUserAssignedTo.length" class="text-h5 carrier-delete-title">האם אתה בטוח שברצונך למחוק את השליח הזה?</v-card-title>
                <v-alert
                    class="carrier-delete-alert"
                    outlined
                    type="error"
                    :value="!!groupsUserAssignedTo.length"
                >
                    שליח זה משובץ למשלוחים: <strong>{{groupsUserAssignedTo | arrayJoin}}</strong> <br>
                    יש להסיר אותו משיבוצים אלו לפני מחיקת השליח
                </v-alert>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="carrier-modal-cancel" 
                        color="blue darken-1" 
                        text 
                        @click="closeDelete">ביטול</v-btn>
                    <v-btn 
                        class="carrier-delete-aprove"
                        :disabled="!!groupsUserAssignedTo.length" 
                        color="blue darken-1" 
                        text 
                        @click="deleteItemConfirm">מחק</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogUpdateDeliveriesNumber" max-width="500px">
            <v-card class="carrier-edit-modal">
                <template v-if="!groupsUserAssignedTo.length">
                    <v-card-title class="text-h5">עדכון מספר משלוחים עבור {{carrierToUpdate.name}}</v-card-title>
                    <v-card-text>
                        <v-text-field
                            class="table-carriers-pickups-number-field"
                            v-model="carrierToUpdate.pickupsNumber"
                            type="number"
                            :min="1"
                            :max="4"
                            onkeydown="return false"
                        ></v-text-field>
                    </v-card-text>
                </template>
                <v-alert
                    class="carrier-edit-alert"
                    outlined
                    type="error"
                    :value="!!groupsUserAssignedTo.length"
                >
                    שליח זה משובץ למשלוחים: <strong>{{groupsUserAssignedTo | arrayJoin}}</strong> <br>
                    יש להסיר אותו מהשיבוצים לפני שינוי מספר משלוחים
                </v-alert>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn 
                        class="carrier-modal-cancel"
                        color="blue darken-1" 
                        text 
                        @click="dialogUpdateDeliveriesNumber = false">ביטול</v-btn>
                    <v-btn 
                        class="carrier-edit-aprove"
                        :disabled="!!groupsUserAssignedTo.length" 
                        color="blue darken-1" 
                        text 
                        @click="updateNumberOfPickups(carrierToUpdate); closeUpdateNumberOfPickupsDialog()">עדכן</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogUpdateDeliveryTime" max-width="500px">
            <v-card class="carrier-edit-modal edit-time">
                <template>
                    <v-card-title class="text-h5">עדכון שעת משלוח עבור {{carrierToUpdate.name}}</v-card-title>
                    <v-card-text>
                        <v-text-field
                            class="table-carriers-delivery-time-field"
                            v-model="carrierToUpdate.time"
                        ></v-text-field>
                    </v-card-text>
                </template>
                <v-alert
                    class="carrier-edit-alert"
                    outlined
                    type="error"
                    :value="!!groupsUserAssignedTo.length"
                >
                    שליח זה משובץ למשלוחים: <strong>{{groupsUserAssignedTo | arrayJoin}}</strong> <br>
                    נא וודא ששליחויות אלו רלוונטיות לשעת המשלוח החדשה
                </v-alert>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn 
                        class="carrier-modal-cancel"
                        color="blue darken-1" 
                        text 
                        @click="closeUpdateDeliveryTimeDialog">ביטול</v-btn>
                    <v-btn 
                        class="carrier-edit-aprove"
                        color="blue darken-1" 
                        text 
                        @click="updateDeliveryTime(carrierToUpdate)">עדכן</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
import Carrier from '../models/Carrier'
import Group from '../models/Group'
import TableCarriers from './TableCarriers'

export default {
    components: {
        TableCarriers
    },
    data: () => ({
        carriers: [],
        groups: [],
        deliveryId: null,
        carriersRef: null,
        groupsRef: null,
        dialogDelete: false,
        dialogUpdateDeliveriesNumber: false,
        dialogUpdateDeliveryTime: false,
        idToDelete: null,
        carrierToUpdate: {},
        groupsUserAssignedTo: []
    }),
    created(){
        this.deliveryId = this.$route.params.id
        this.carriersRef = this.$firebaseService.getRef(this.deliveryId, 'carriers')
        this.groupsRef = this.$firebaseService.getRef(this.deliveryId, 'groups')
        this.carriersRef.on('value', (snapshot) => {
            this.carriers = Carrier.fromSnapshot(snapshot)
            this.setCarrriersGroups()
        });
        this.groupsRef.on('value', (snapshot) => {
            this.groups = Group.fromSnapshot(snapshot)
            this.setCarrriersGroups()
        });
    },
    watch: {
        dialogDelete (val) {
            val || this.closeDelete()
        },
        dialogUpdateDeliveriesNumber (val) {
            val || (this.dialogUpdateDeliveriesNumber = false)
        }
    },
    methods: {
        async updateNumberOfPickupsDialog (carrier) {
            let groupsAssigned = await this.getGroupsForCarrier(carrier.id)
            this.groupsUserAssignedTo = groupsAssigned.map(
                item => item.index
            )
            this.carrierToUpdate = {id: carrier.id, pickupsNumber: carrier.pickupsNumber, name: carrier.name}
            this.dialogUpdateDeliveriesNumber = true
        },

        async updateDeliveryTimeDialog (carrier) {
            let groupsAssigned = await this.getGroupsForCarrier(carrier.id)
            this.groupsUserAssignedTo = groupsAssigned.map(
                item => item.index
            )
            this.carrierToUpdate = {id: carrier.id, time: carrier.time, name: carrier.name}
            this.dialogUpdateDeliveryTime = true
        },

        updateNumberOfPickups () {
            this.carriersRef.child(this.carrierToUpdate.id).update({'pickupsNumber': this.carrierToUpdate.pickupsNumber});
        },

        updateDeliveryTime () {
            this.carriersRef.child(this.carrierToUpdate.id).update({'time': this.carrierToUpdate.time});
            this.closeUpdateDeliveryTimeDialog()
        },

        closeUpdateNumberOfPickupsDialog () {
            this.carrierToUpdate = {}
            this.dialogUpdateDeliveriesNumber = false;
        },

        closeUpdateDeliveryTimeDialog () {
            this.carrierToUpdate = {}
            this.dialogUpdateDeliveryTime = false;
        },

        async deleteItem (carrierId) {
            let groupsAssigned = await this.getGroupsForCarrier(carrierId)
            this.groupsUserAssignedTo = groupsAssigned.map(
                item => item.index
            )
            this.idToDelete = carrierId
            this.dialogDelete = true
        },

        deleteItemConfirm () {
            this.carriersRef.child(this.idToDelete).remove();
            this.idToDelete = null
            this.closeDelete()
        },

        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        setCarrriersGroups () {
            this.carriers = this.carriers.map(
                carrier => {
                    let groups = this.groups.filter(
                        group => {
                            return group.carrier == carrier.id
                        }
                    )
                    carrier.groups = groups
                    return carrier
                }
            )
        },

        getGroupsForCarrier (carrierId) {
            return new Promise(
                (resolve) => {
                    this.groupsRef
                        .orderByChild("carrier")
                        .equalTo(carrierId)
                        .once("value", snapshot => {
                            if (!snapshot.exists()){
                                resolve([]);
                                return 
                            }
                            resolve(Group.fromSnapshot(snapshot))
                        }
                    );
                }
            )
        }
    },
    
}
</script>
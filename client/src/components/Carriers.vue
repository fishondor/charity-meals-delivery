<template>
    <v-container>
        <TableCarriers :carriers="carriers" @onDelete="deleteItem" />
        <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
                <v-card-title v-if="!groupsUserAssignedTo.length" class="text-h5">Are you sure you want to delete this item?</v-card-title>
                <v-alert
                    outlined
                    type="error"
                    :value="!!groupsUserAssignedTo.length"
                >
                    This carrier has assigned deliveries: <strong>{{groupsUserAssignedTo | arrayJoin}}</strong> <br>
                    Please remove these assignments before deleting this user.
                </v-alert>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                    <v-btn :disabled="!!groupsUserAssignedTo.length" color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
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
        idToDelete: null,
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
    },
    filters: {
        arrayJoin(groups){
            return groups.join(', ')
        }
    },
    methods: {
        async deleteItem (carrierId) {
            let groupsAssigned = await this.getGroupsForCarrier(carrierId)
            if(groupsAssigned.length){
                this.groupsUserAssignedTo = groupsAssigned.map(
                    item => item.index
                )
            }
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
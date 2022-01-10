<template>
    <v-container id="destinations-table">
        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th>
                            מספר
                        </th>
                        <th>
                            תיאור
                        </th>
                        <th>
                            שם
                        </th>
                        <th>
                            טלפון
                        </th>
                        <th>
                            כתובת
                        </th>
                        <th>
                        </th>
                        <th>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="item in destinations"
                        :key="item.id"
                    >
                        <td>{{ item.index }}</td>
                        <td>{{ item.description }}</td>
                        <td class="destinations-table-item-name">{{ item.name }}</td>
                        <td>{{ item.phone }}</td>
                        <td>{{ item.address }}</td>
                        <td>
                            <v-icon
                                @click="editItem(item)"
                                class="destinations-edit-item"
                            >
                                {{icons.edit}}
                            </v-icon>
                        </td>
                        <td>
                            <v-icon
                                @click="deleteItem(item)"
                                class="destinations-delete-item"
                            >
                                {{icons.deleteIcon}}
                            </v-icon>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <v-card-actions>
            <DialogDestination @onCreate='onCreateDestination'/>
        </v-card-actions>
        <v-dialog content-class="dialog-delete-destination" v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">האם למחוק את היעד?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">בטל</v-btn>
              <v-btn id="delete-destination-dialog-approve" color="blue darken-1" text @click="deleteItemConfirm">מחק</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog content-class="dialog-edit-destination" v-model="dialogEdit">
            <v-card>
                <v-card-title>
                    <span class="text-h5">יעד לחלוקה</span>
                </v-card-title>
                <v-card-text>
                    <FormDestination
                        :content="destinationItem"/>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogEdit = false">ביטול</v-btn>
                    <v-btn id="edit-destination-dialog-approve" color="blue darken-1" text @click="editItemConfirm(destinationItem)">שמור</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
import FormDestination from './FormDestination.vue'
import DialogDestination from './DialogDestination.vue'

import Destination from '../models/Destination'
import {
    deleteIcon,
    edit
} from './icons'

export default {
    components: {
        DialogDestination,
        FormDestination
    },
    data: () => ({
        destinations: [],
        icons: {
            deleteIcon,
            edit
        },
        dialogDelete: false,
        dialogEdit: false,
        itemToEdit: {},
        destinationItem: {},
        destinationsRef: null
    }),
    async created(){
        let user = await this.$firebaseService.getCurrentUser()
        this.destinationsRef = this.$firebaseService.getDestinationsRef(user.uid)
        this.destinationsRef.on('value', (snapshot) => {
            this.destinations = Destination.fromSnapshot(snapshot)
        });
        this.validateIndexes(this.destinations)
    },
    watch: {
        dialog (val) {
            val || this.close()
        },
        dialogDelete (val) {
            val || this.closeDelete()
        },
    },
    computed: {
        destinationsIndexes() {
            return this.destinations.map(
                item => item.index
            )
        }
    },
    methods: {
        async validateIndexes (destinations) {
            destinations.map(
                async (destination, index) => {
                    if(!destination.index || destination.index != index + 1){
                        destination.index = index + 1
                        await this.editItemConfirm(destination)
                    }
                }
            )
        },

        deleteItem (item) {
            this.idToDelete = item.id
            this.dialogDelete = true
        },

        editItem(item) {
            this.destinationItem = item;
            this.dialogEdit = true
        },

        closeEdit() {
            this.destinationItem = {}
            this.dialogEdit = false
        },

        async deleteItemConfirm () {
            let user = await this.$firebaseService.getCurrentUser()
            let response = this.$firebaseService.deleteDestination(user.uid, this.idToDelete)
            if(!response){
                this.$notificationsService.error("Could not delete destination")
                return
            }
            this.$notificationsService.success(`Destination ${this.idToDelete} deleted`)
            this.idToDelete = null
            this.validateIndexes(this.destinations)
            this.closeDelete()
        },

        closeDelete () {
            this.dialogDelete = false
        },

        async onCreateDestination (destination) {
            let user = await this.$firebaseService.getCurrentUser()
            destination.index = this.destinations.length + 1
            let destinationId = await this.$firebaseService.saveDestination(user.uid, destination)
            if(!destinationId){
                this.$notificationsService.error(`Could not save destination. Please try again later`)
                return
            }
            this.$notificationsService.success(`Destination created successfully`)
        },

        async editItemConfirm(destination){
            let user = await this.$firebaseService.getCurrentUser()
            let destinationId = await this.$firebaseService.editDestination(user.uid, destination)
            if(!destinationId){
                this.$notificationsService.error(`Could not edit destination. Please try again later`)
                return
            }
            this.$notificationsService.success(`Destination updated successfully`)
            this.closeEdit()
        }
    }
}
</script>
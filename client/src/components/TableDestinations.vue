<template>
    <v-container id="destinations-table">
        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th>
                            מזהה
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
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="item in destinations"
                        :key="item.id"
                    >
                        <td>{{ item.id }}</td>
                        <td class="destinations-table-item-name">{{ item.name }}</td>
                        <td>{{ item.phone }}</td>
                        <td>{{ item.address }}</td>
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
            <DialogDestination @onCreate='onCreateDestination' />
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
    </v-container>
</template>
<script>
import DialogDestination from './DialogDestination.vue'

import Destination from '../models/Destination'
import {
    deleteIcon
} from './icons'

export default {
    components: {
        DialogDestination
    },
    data: () => ({
        destinations: [],
        icons: {
            deleteIcon
        },
        dialogDelete: false
    }),
    async created(){
        this.setDestinations()
    },
    watch: {
        dialog (val) {
            val || this.close()
        },
        dialogDelete (val) {
            val || this.closeDelete()
        },
    },
    methods: {
        async setDestinations () {
            let user = await this.$firebaseService.getCurrentUser()
            let destinationsSnapshot = await this.$firebaseService.getDestinationsByOwner(user.uid)
            this.destinations = Destination.fromSnapshot(destinationsSnapshot)
        },

        deleteItem (item) {
            this.idToDelete = item.id
            this.dialogDelete = true
        },

        async deleteItemConfirm () {
            let user = await this.$firebaseService.getCurrentUser()
            let response = this.$firebaseService.deleteDestination(user.uid, this.idToDelete)
            if(!response){
                this.$notificationsService.error("Could not delete destination")
                return
            }
            this.setDestinations()
            this.$notificationsService.success(`Destination ${this.idToDelete} deleted`)
            this.idToDelete = null
            this.closeDelete()
        },

        closeDelete () {
            this.dialogDelete = false
        },

        async onCreateDestination (destination) {
            let user = await this.$firebaseService.getCurrentUser()
            let destinationId = await this.$firebaseService.saveDestination(user.uid, destination)
            if(!destinationId){
                this.$notificationsService.error(`Could not save destination. Please try again later`)
                return
            }
            this.setDestinations()
            this.$notificationsService.success(`Destination ${destinationId} saved successfully`)
        }
    }
}
</script>
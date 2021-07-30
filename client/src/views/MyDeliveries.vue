<template>
    <v-container>
        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th>
                            מזהה
                        </th>
                        <th>
                            תאריך
                        </th>
                        <th>
                            הערות
                        </th>
                        <th>
                            קישור
                        </th>
                        <th>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="item in deliveries"
                        :key="item.id"
                    >
                        <td>{{ item.id }}</td>
                        <td>{{ item.date }}</td>
                        <td>{{ item.description }}<td>
                        <td><a :href="item.id | deliveryLink">{{ item.id | deliveryLink }}</a></td>
                        <td>
                            <v-icon
                                @click="deleteItem(item)"
                                class="deliveries-delete-item"
                            >
                                {{icons.deleteIcon}}
                            </v-icon>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <v-card-actions>
            <v-btn
                color="primary"
                class="mr-4"
                to="/delivery/new"
                >
                new
            </v-btn>
        </v-card-actions>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn id="delete-delivery-dialog-approve" color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
import Delivery from '../models/Delivery'
import {
    deleteIcon
} from '../components/icons'

export default {
    data: () => ({
        deliveries: [],
        icons: {
            deleteIcon
        },
        dialogDelete: false,
    }),
    async created(){
        let user = await this.$firebaseService.getCurrentUser()
        let deliveriesSnapshot = await this.$firebaseService.getDeliveriesByOwner(user.uid)
        this.deliveries = Delivery.fromSnapshot(deliveriesSnapshot)
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
        deleteItem (item) {
            this.idToDelete = item.id
            this.dialogDelete = true
        },

        deleteItemConfirm () {
            let response = this.$firebaseService.deleteDelivery(this.idToDelete)
            if(!response){
                this.$notificationsService.error("Could not delete delivery")
                return
            }
            this.deliveries = this.deliveries.filter(
                item => item.id != this.idToDelete
            )
            this.idToDelete = null
            this.closeDelete()
            this.$notificationsService.success(`Delivery ${this.idToDelete} deleted`)
        },

        closeDelete () {
            this.dialogDelete = false
        },
    }
}
</script>
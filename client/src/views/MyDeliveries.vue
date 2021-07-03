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
                            קישור
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
                        <td><a :href="item.id | deliveryLink">{{ item.id | deliveryLink }}</a></td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </v-container>
</template>
<script>
import Delivery from '../models/Delivery'

export default {
    data: () => ({
        deliveries: []
    }),
    async created(){
        let user = await this.$firebaseService.getCurrentUser()
        let deliveriesSnapshot = await this.$firebaseService.getDeliveriesByOwner(user.uid)
        this.deliveries = Delivery.fromSnapshot(deliveriesSnapshot)
    }
}
</script>
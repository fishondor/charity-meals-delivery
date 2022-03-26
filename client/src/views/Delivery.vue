<template>
    <v-container fluid>
        <h2 id="delivery-title">חלוקה לתאריך: {{date | formatDate}}</h2>
        <h3 v-if="description" id="delivery-description">{{description}}</h3>
        <template v-if="isAdmin">
            <DeliveryAdmin />
        </template>
        <template v-else>
            <DeliveryCarrier />
        </template>
    </v-container>
</template>

<script>
import Delivery from '../models/Delivery'

export default {
    components: {
        DeliveryAdmin: () => import('./DeliveryAdmin'),
        DeliveryCarrier: () => import('./DeliveryCarrier')
    },
    data: () => ({
        deliveryref: null,
        date: null,
        description: "",
        groups: [],
        isAdmin: false,
        isRegistered: false,
        deliveryId: null,
        isValid: false
    }),
    async created(){
        this.$loaderService.show()
        this.deliveryId = this.$route.params.id
        let deliverySnapshot = await this.getDelivery(this.deliveryId)
        if(!deliverySnapshot)
            return
        
        this.date = deliverySnapshot.child('date').val()
        this.description = deliverySnapshot.child('description').val()
        this.secondaryAdmins = deliverySnapshot.child('secondaryAdmins').val()
        this.isAdmin = await this.isDeliveryAdmin(this.deliveryId)
        let delivery = Delivery.fromSnapshot([deliverySnapshot])
        this.$store.commit("setDelivery", delivery[0]);
        this.$loaderService.hide()
    },
    methods: {
        isDeliveryAdmin: async function(deliveryId){
            let user = await this.$firebaseService.getCurrentUser()

            let adminId = await this.getDeliveryAdmin(deliveryId)
            if (user.uid == adminId)
                return true
            
            if (Array.isArray(this.secondaryAdmins) && this.secondaryAdmins.includes(user.email))
                return true

            return false
        },
        getDeliveryAdmin: async function(deliveryId){
            try{
                let result = await this.$firebaseService.getDeliveryOwner(deliveryId)
                if(!result){
                    this.$notificationsService.error("An error occured");
                    return false
                }
                return result
            }catch(error){
                console.error("Error fetching delivery", error)
                this.$notificationsService.error("An error occured");
            }
            return false
        },
        getDelivery: async function(deliveryId){
            try{
                let result = await this.$firebaseService.getDelivery(deliveryId)
                this.deliveryref = result;
                let snapshot = await this.deliveryref.once('value');
                if (!snapshot.exists()){
                    this.$notificationsService.error("Could not find this delivery. please make sure you get the correct link from administrator");
                    return false
                }
                return snapshot
            }catch(error){
                console.error("Error fetching delivery", error)
                this.$notificationsService.error("An error occured");
            }
        }
    }
}
</script>
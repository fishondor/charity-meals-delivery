<template>
    <v-container>
        <h2>חלוקה לתאריך: {{date | formatDate}}</h2>
        <h3 v-if="description">{{description}}</h3>
        <template v-if="isAdmin">
            <DeliveryAdmin />
        </template>
        <template v-else>
            <DeliveryCarrier />
        </template>
    </v-container>
</template>

<script>

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
        this.isAdmin = await this.isDeliveryAdmin(this.deliveryId)
        this.$loaderService.hide()
    },
    methods: {
        isDeliveryAdmin: async function(deliveryId){
            let adminId = await this.getDeliveryAdmin(deliveryId)
            let user = await this.$firebaseService.getCurrentUser()
            return user.uid == adminId
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
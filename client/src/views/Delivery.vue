<template>
    <v-container>
        <h3>{{date | formatDate}}</h3>
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
        groups: [],
        isAdmin: false,
        isRegistered: false,
        deliveryId: null
    }),
    async created(){
        this.deliveryId = this.$route.params.id
        this.getDelivery(this.deliveryId)
        this.isAdmin = await this.isDeliveryAdmin(this.deliveryId)
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
                if(!result){
                    this.$notificationsService.error("An error occured");
                    return
                }
                this.deliveryref = result;
                this.deliveryref.once('value', (snapshot) => {
                    this.date = snapshot.child('date').val()
                });
            }catch(error){
                console.error("Error fetching delivery", error)
                this.$notificationsService.error("An error occured");
            }
        }
    }
}
</script>
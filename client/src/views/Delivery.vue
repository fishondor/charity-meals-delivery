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
        
        this.isAdmin = await this.isDeliveryAdmin(this.deliveryId)
        
        this.setDeliveryParams(this.deliveryId)
    },
    methods: {
        isDeliveryAdmin: async function(deliveryId){
            let user = await this.$firebaseService.getCurrentUser()
            
            try{
                let adminIdRef = await this.$firebaseService.getRef(deliveryId, 'ownerId').once('value')
                let adminId = adminIdRef.val()
                if (user.uid == adminId)
                    return true
            }catch(error){
                if(!error.code == "PERMISSION_DENIED"){
                    this.$logger.error(error)
                    return false
                }
            }

            try{
                let secondaryAdminsRef = await this.$firebaseService.getRef(deliveryId, 'secondaryAdmins').once('value')
                let secondaryAdmins = secondaryAdminsRef.val()
                if (secondaryAdmins && secondaryAdmins.split(",").includes(user.email))
                    return true
            }catch(error){
                if(!error.code == "PERMISSION_DENIED"){
                    this.$logger.error(error)
                    return false
                }
            }

            return false
        },
        setDeliveryParams: async function(deliveryId){
            let date = await this.$firebaseService.getRef(deliveryId, 'date').once('value');
            this.date = date.val()
            let description = await this.$firebaseService.getRef(deliveryId, 'description').once('value');
            this.description = description.val()
            let timeOptions = await this.$firebaseService.getRef(deliveryId, 'timeOptions').once('value');
            let delivery = new Delivery(
                {
                    date: date.val(), 
                    description: description.val(),
                    timeOptions: timeOptions.val()
                }
            )
            this.$store.commit("setDelivery", delivery);
        }
    }
}
</script>
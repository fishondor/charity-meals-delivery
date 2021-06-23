<template>
    <div>
        <template v-if="!isRegistered">
            <p>You are not registerd to this delivery</p>
            <FormRegisterToDelivery @onSubmit="submit" />
        </template>
        <template v-else>
            <Deliveries :deliveries="deliveris" />
        </template>
    </div>
</template>
<script>
import FormRegisterToDelivery from '../components/FormRegisterToDelivery'

export default {
    data: () => ({
        groups: [],
        isRegistered: false,
        deliveryId: null
    }),
    components: {
        FormRegisterToDelivery,
    },
    methods: {
        submit: async function(carrier){
            try{
                let result = await this.$firebaseService.registerCarrier(this.deliveryId, carrier)
                if(!result){
                    this.$notificationsService.error("An error occured");
                    return
                }
                this.$notificationsService.success("Successfully registered");
            }catch(error){
                console.error("Error registering carrier", error)
                this.$notificationsService.error("An error occured");
            }
        },
    }
}
</script>
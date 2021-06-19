<template>
    <v-container>
        <h3>{{delivery.date | formatDate}}</h3>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        delivery: {}
    }),
    mounted(){
        this.getDelivery()
    },
    methods: {
        getDelivery: async function(){
            let deliveryId = this.$route.params.id
            console.log("D", deliveryId)
            try{
                let result = await this.$dbService.getDelivery(deliveryId)
                if(!result){
                    this.$notificationsService.error("An error occured");
                    return
                }
                this.delivery = result
            }catch(error){
                console.error("Error fetching delivery", error)
                this.$notificationsService.error("An error occured");
            }
        }
    }
}
</script>
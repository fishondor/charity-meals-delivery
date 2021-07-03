<template>
    <div>
        <FormDelivery @onSubmit="submit" />
    </div>
</template>

<script>
import FormDelivery from '../components/FormDelivery'

export default {
    title: "Friday Meals, Create delivery",
    name: 'create',
    components: {
        FormDelivery,
    },
    methods: {
        submit: async function(delivery){
            try{
                let owner = await this.$firebaseService.getCurrentUser();
                delivery.owner = owner.uid
                let deliveryId = await this.$firebaseService.createDelivery(delivery)
                if(!deliveryId){
                    this.$notificationsService.error("An error occured while saving");
                    return
                }
                this.$notificationsService.success("Saved");
                this.$router.push({name: 'Delivery', params: { id: deliveryId }})
            }catch(err){
                this.$notificationsService.error("Could not save. Please try again later");
                console.error(err)
            }
        }
    }
}
</script>
<template>
    <div>
        <FormDelivery @onSubmit="submit" />
    </div>
</template>

<script>
import firebaseService from '../providers/Firebase'
import FormDelivery from '../components/FormDelivery'

export default {
    name: 'create',
    components: {
        FormDelivery,
    },
    methods: {
        submit: async function(delivery){
            try{
                let owner = await firebaseService.getCurrentUser();
                delivery.owner = owner.uid
                firebaseService.createDelivery(delivery)
                /* let result = await this.$dbService.saveDelivery(content);
                if(!result){
                    this.$notificationsService.error("An error occured while saving");
                    return
                }
                this.$notificationsService.success("Saved"); */
            }catch(err){
                this.$notificationsService.error("Could not save. Please try again later");
                console.error(err)
            }
        }
    }
}
</script>
<template>
    <div>
        <FormPickup @onSubmit="submit" />
    </div>
</template>

<script>
import FormPickup from '../components/FormPickup'

export default {
    name: 'create',
    components: {
        FormPickup,
    },
    methods: {
        submit: async function(content){
            console.log("Content", content)
            try{
                let result = await this.$dbService.savePickup(content);
                if(!result){
                    this.$notificationsService.error("An error occured while saving");
                    return
                }
                this.$notificationsService.success("Saved");
            }catch(err){
                this.$notificationsService.error("Could not save. Please try again later");
            }
        }
    }
}
</script>
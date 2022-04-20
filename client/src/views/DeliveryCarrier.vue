<template>
    <div>
        <template v-if="!isRegistered">
            <p>הרשמה לחלוקה</p>
            <FormRegisterToDelivery @onSubmit="submit" />
        </template>
        <template v-else>
            <template v-if="groups.length">
                <TablePickups v-for="group in sortedGroups" :key="group.index"
                    :group="group"
                    :editable="false"
                    :hideFooter="true"/>
            </template>
            <template v-else>
                <h4>
                    הינך רשום לחלוקה זו.
                </h4>
                <p>
                    עמוד זה יתעדכן לאחר שתשובץ למסלול.
                </p>
            </template>
        </template>
    </div>
</template>
<script>
import FormRegisterToDelivery from '../components/FormRegisterToDelivery'
import TablePickups from '../components/TablePickups'

import Group from '../models/Group'

export default {
    data: () => ({
        groups: [],
        deliveryId: null,
        isRegistered: false,
        carrierRef: null,
        groupsRef: null
    }),
    components: {
        FormRegisterToDelivery,
        TablePickups
    },
    async created(){
        this.$loaderService.show()

        this.deliveryId = this.$route.params.id
        this.user = await this.$firebaseService.getCurrentUser()
        this.initCarrierRef(this.user.uid)

        this.$loaderService.hide()
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
        initCarrierRef: function(userId){
            this.carrierRef = this.$firebaseService.getRef(this.deliveryId, `carriers/${userId}`)
            this.carrierRef.on("value",snapshot => {
                this.isRegistered = snapshot.exists()
                if(!this.isRegistered)
                    return
                this.initGroupsRef(userId);
            });
        },
        initGroupsRef: function(userId){
            this.groupsRef = this.$firebaseService.getRef(this.deliveryId, `groups`)
                .orderByChild("carrier")
                .equalTo(userId)
                .on("value",snapshot => {
                    if (!snapshot.exists()){
                        return
                    }
                    this.groups = Group.fromSnapshot(snapshot)
                }
            );
        }
    },
    computed: {
        sortedGroups() {
            return this.groups.slice().sort(
                (a, b) => {
                    if(typeof a.index === 'undefined')
                        return 0;
                    return a.index - b.index
                }
            )
        }
    }
}
</script>
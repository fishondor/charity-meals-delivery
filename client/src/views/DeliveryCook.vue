<template>
    <v-container>
        <template v-if="groups.length">
            <TablePickups v-for="group in sortedGroups" :key="group.index"
                :group="group"
                :editable="false"
                :cook="true"
                :disableAddPickup="disableAddPickups"
                :hideFooter="true"
                @onSave="savePickup"/>
        </template>
        <template v-else>
            <h4>
                טרם נוספו יעדים לחלוקה
            </h4>
            <p>
                עמוד זה יתעדכן ברגע שמנהל יוסיף יעדים
            </p>
        </template>
    </v-container>
</template>
<script>
import TablePickups from '../components/TablePickups'

import Group from '../models/Group'

export default {
    data: () => ({
        groups: [],
        deliveryId: null,
        groupsRef: null,
        disableAddPickups: false
    }),
    components: {
        TablePickups
    },
    async created(){
        this.deliveryId = this.$route.params.id
        this.initGroupsRef()
    },
    methods: {
        initGroupsRef: async function(){
            this.groupsRef = this.$firebaseService.getRef(this.deliveryId, `groups`)
            this.groupsRef.on("value",snapshot => {
                    if (!snapshot.exists()){
                        return
                    }
                    this.groups = Group.fromSnapshot(snapshot)
                }
            );
            let deliveryRef = await this.$firebaseService.getDelivery(this.deliveryId)
            deliveryRef.once("value", snapshot => {
                this.disableAddPickups = snapshot.child("lockCooksRegistration").val()
            })
        },

        savePickup (groupId, pickup) {
            this.groupsRef.child(`${groupId}/pickups`).push(pickup)
        },
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
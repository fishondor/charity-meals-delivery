<template>
    <v-container>
        <v-list>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title v-text="`קישור להרשמה: ${deliveryLink}`"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                    <v-btn icon @click="copyLink">
                        <v-icon
                             color="primary"
                        >
                            {{icons.copy}}
                        </v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>חלוקות: {{groups.length}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>מחלקים: {{carriers.length}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>יכולים לחלק ל: {{carriersDelivaryCount}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>מספר מחלקים חסר: {{groups.length - carriersDelivaryCount}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-container>
</template>
<script>
import Group from '../models/Group'
import Carrier from '../models/Carrier'

import {
    copy
} from './icons'

export default {
    data(){
        return {
            groups: [],
            carriers: [],
            deliveryId: null,
            carriersDelivaryCount: 0,
            deliveryLink: '',
            icons: {
                copy
            }
        }
    },
    async created(){
        this.deliveryId = this.$route.params.id
        let deliveryRef = await this.$firebaseService.getDelivery(this.deliveryId)
        deliveryRef.on('value', this.setData);
        this.deliveryLink = `${window.location.protocol}//${window.location.hostname}/delivery/${this.deliveryId}`
    },
    methods: {
        setData(snapshot){
            this.groups = Group.fromSnapshot(snapshot.child('groups'))
            this.carriers = Carrier.fromSnapshot(snapshot.child('carriers'))
            this.carriersDelivaryCount = this.carriers.reduce(
                (count, carrier) => {
                    count += carrier.pickupsNumber
                    return count
                },
                0
            )
        },
        copyLink(){
            var tempInput = document.createElement("input");
            tempInput.value = this.deliveryLink
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand("copy");
            document.body.removeChild(tempInput);
            this.$notificationsService.success("Cpied to clipboard")
        }
    }
}
</script>
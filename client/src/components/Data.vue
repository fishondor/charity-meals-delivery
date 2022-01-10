<template>
    <v-container>
        <v-list>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>קישור להרשמה: {{deliveryId | deliveryLink}}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                    <v-btn icon @click="copyLink(createLink(deliveryId))">
                        <v-icon
                             color="primary"
                        >
                            {{icons.copy}}
                        </v-icon>
                    </v-btn>
                </v-list-item-action>
                <v-list-item-action>
                    <a :href="shareText | whatsappShare">
                        <v-icon
                            color="primary"
                        >
                            {{icons.whatsapp}}
                        </v-icon>
                    </a>
                </v-list-item-action>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>קישור למבשלות: {{deliveryId | deliveryCooksLink}}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                    <v-btn icon @click="copyLink(createCooksLink(deliveryId))">
                        <v-icon
                             color="primary"
                        >
                            {{icons.copy}}
                        </v-icon>
                    </v-btn>
                </v-list-item-action>
                <v-list-item-action>
                    <a :href="shareTextCooks | whatsappShare">
                        <v-icon
                            color="primary"
                        >
                            {{icons.whatsapp}}
                        </v-icon>
                    </a>
                </v-list-item-action>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>נעל רישום מבשלות</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                    <v-switch
                        v-model="lockCooksRegistration"
                        @change="onLockCooksRegistrationChanged"
                    ></v-switch>
                </v-list-item-action>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>מנהלים נוספים: </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action id="secondary-admin-list-item">
                    <v-combobox
                        id="secondary-admin-input"
                        v-model="secondaryAdmins"
                        :items="[]"
                        label="הזן כתובת מייל"
                        multiple
                        chips
                        clearable
                        deletable-chips
                        @change="onExtraAdminsChange"
                    ></v-combobox>
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
            <v-list-item>
                <v-list-item-icon>
                    <v-btn id="button-reset-groups" icon @click="resetGroupsClicked">
                        <v-icon 
                            v-text="icons.deleteAlert"
                            color="warning"
                        ></v-icon>
                    </v-btn>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>מחק את כל החלוקות</v-list-item-title>
                </v-list-item-content>
                <v-dialog v-model="dialogDelete">
                    <v-card>
                        <v-card-title class="text-h5">פעולה זו תמחוק את כל החלוקות הקיימות במערכת. האם למחוק?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="closeDelete">בטל</v-btn>
                            <v-btn id="dialog-reset-groups-approve" color="blue darken-1" text @click="deleteGroupsConfirm">מחק</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-list-item>
        </v-list>
    </v-container>
</template>
<script>
import Group from '../models/Group'
import Carrier from '../models/Carrier'

import {
    copy,
    whatsapp,
    deleteAlert
} from './icons'

export default {
    data(){
        return {
            groups: [],
            carriers: [],
            deliveryId: null,
            carriersDelivaryCount: 0,
            icons: {
                copy,
                whatsapp,
                deleteAlert
            },
            deliveryDate: '',
            deliveryDescription: '',
            dialogDelete: false,
            deliveryRef: null,
            secondaryAdmins: [],
            lockCooksRegistration: false
        }
    },
    async created(){
        this.deliveryId = this.$route.params.id
        this.deliveryRef = await this.$firebaseService.getDelivery(this.deliveryId)
        this.deliveryRef.on('value', this.setData);
    },
    computed: {
        shareText() {
            let deliveryLink = this.$options.filters.deliveryLink(this.deliveryId);
            let title = 'מחלקים ארוחות שישי'
            return `${title}\n${this.deliveryDate}\n${this.deliveryDescription}\n${deliveryLink}`
        },
        shareTextCooks() {
            let deliveryLink = this.$options.filters.deliveryCooksLink(this.deliveryId);
            let title = 'מחלקים ארוחות שישי'
            return `${title}\n${this.deliveryDate}\n${this.deliveryDescription}\n${deliveryLink}`
        }
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
            ),
            this.deliveryDescription = snapshot.child('description').val();
            this.deliveryDate = snapshot.child('date').val();
            this.secondaryAdmins = snapshot.child('secondaryAdmins').val();
            this.lockCooksRegistration = snapshot.child('lockCooksRegistration').val();
        },
        copyLink(link){
            var tempInput = document.createElement("input");
            tempInput.value = link;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand("copy");
            document.body.removeChild(tempInput);
            this.$notificationsService.success("הקישור הועתק")
        },
        deleteGroupsConfirm () {
            try{
                this.deliveryRef.child('groups').remove()
                this.closeDelete()
                this.$notificationsService.success("Successfully deleted all groups")
            }catch(error){
                this.$notificationsService.error("Error deleting all groups")
            }
        },
        closeDelete () {
            this.dialogDelete = false
        },
        resetGroupsClicked () {
            this.dialogDelete = true
        },
        onExtraAdminsChange () {
            this.deliveryRef.child('secondaryAdmins').set(this.secondaryAdmins)
        },
        createLink (deliveryId) {
            return this.$options.filters.deliveryLink(deliveryId)
        },
        createCooksLink(deliveryId) {
            return this.$options.filters.deliveryCooksLink(deliveryId)
        },
        onLockCooksRegistrationChanged() {
            this.deliveryRef.child('lockCooksRegistration').set(this.lockCooksRegistration)
        }
    },
    watch: {
        dialogDelete (val) {
            val || this.closeDelete()
        },
    },
}
</script>
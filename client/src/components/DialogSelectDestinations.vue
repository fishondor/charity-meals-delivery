<template>
    <v-dialog
        v-model="selectDestinationsDialog"
    >
        <template v-slot:activator="{}">
            <v-btn
                color="primary"
                dark
                class="mb-2"
                v-on="{click: openSelectDestinationsDialog}"
                >
                הוסף חלוקות מרשימת היעדים
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="text-h5">בחר יעדים</span>
            </v-card-title>
            <v-card-text>
                <FormSelectDestinations
                    :destinations="userDestinations"
                    @change="destinationsChanged"/>
            </v-card-text>
            <v-card-actions>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeSelectedDestinationsDialog">ביטול</v-btn>
                    <v-btn id="create-destination-dialog-approve" color="blue darken-1" text @click="addDestinationsConfirm">הוסף</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import FormSelectDestinations from './FormSelectDestinations.vue'
import Destination from '../models/Destination'

export default {
    data: () => ({
        selectDestinationsDialog: false,
        userDestinations: [],
        selectedDestinations: [],
    }),
    components: {
        FormSelectDestinations
    },
    async created(){
        let user = await this.$firebaseService.getCurrentUser()
        let destinationsSnapshot = await this.$firebaseService.getDestinationsByOwner(user.uid)
        this.userDestinations = Destination.fromSnapshot(destinationsSnapshot)
    },
    methods: {
        destinationsChanged (destinations) {
            this.selectedDestinations = destinations
        },

        openSelectDestinationsDialog () {
            this.selectDestinationsDialog = true
        },

        closeSelectedDestinationsDialog () {
            this.selectDestinationsDialog = false
        },

        addDestinationsConfirm () {
            this.$emit('onSelected', this.selectedDestinations)
            this.closeSelectedDestinationsDialog()
        }
    }
}
</script>
<template>
    <v-dialog
        v-model="dialogCreate"
        content-class="dialog-create-destination"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                id="button-create-destination"
                >
                הוסף יעד
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="text-h5">יעד לחלוקה</span>
            </v-card-title>
            <v-card-text>
                <FormDestination
                    :content="newDestination"
                    @onChange="onDestinationChange" />
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialogCreate = false">ביטול</v-btn>
                <v-btn id="create-destination-dialog-approve" color="blue darken-1" text @click="createItemConfirm">שמור</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import FormDestination from './FormDestination.vue'
import Destination from '../models/Destination'

export default {
    props: {
        item: {
            type: Destination,
            default(){return new Destination({})}
        } 
    },
    components: {
        FormDestination
    },
    data: () => ({
        newDestination: new Destination({}),
        createdDestination: new Destination({}),
        dialogCreate: false
    }),
    methods: {
        onDestinationChange: function(itemKey, value){
            this.createdDestination[itemKey] = value
        },
        createItemConfirm: function(){
            this.$emit('onCreate', this.createdDestination)
            this.newDestination = new Destination({})
            this.dialogCreate = false
        }
    }
}
</script>
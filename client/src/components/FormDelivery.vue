<template>
    <v-container>
        <v-form
            ref="form"
            v-model="formValid"
        >
            <v-card-text>
                <v-row justify="center">
                    <v-date-picker v-model="content.date"></v-date-picker>
                </v-row>
                <v-text-field
                    v-model="content.description"
                    :counter="150"
                    label="הערות"
                    dense
                    outlined
                >
                </v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    color="primary"
                    class="mr-4"
                    @click="submit"
                    id="button-create-delivery"
                    >
                    Create
                </v-btn>
            </v-card-actions>
        </v-form>
    </v-container>
</template>

<script>
import Delivery from '../models/Delivery'

export default {
    data: () => ({
        content: {
            date: new Date().toISOString().substr(0, 10),
            description: ""
        },
        formValid: false
    }),
    methods: {
        submit: function(){
            let delivery = new Delivery(
                {
                    date: this.content.date,
                    description: this.content.description
                }
            )
            this.$emit('onSubmit', delivery);
        }
    }
}
</script>
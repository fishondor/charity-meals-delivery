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
            </v-card-text>
            <v-card-actions>
                <v-btn
                    color="success"
                    class="mr-4"
                    @click="submit"
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
            date: new Date().toISOString().substr(0, 10)
        },
        formValid: false
    }),
    methods: {
        submit: function(){
            let delivery = new Delivery(
                {
                    date: this.content.date
                }
            )
            this.$emit('onSubmit', delivery);
        }
    }
}
</script>
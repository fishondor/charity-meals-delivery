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
                <v-row>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-select
                            v-model="content.timeOptions"
                            :items="timeOptions"
                            chips
                            label="אפשרויות לשעות חלוקה"
                            multiple
                            dense
                            outlined
                            item-text="time"
                            return-object
                        ></v-select>
                    </v-col>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-text-field v-for="(item, index) in content.timeOptions" :key="index"
                            v-model="item.numOfCarriers"
                            :label="`כמה מחלקים דרושים לשעה ${item.time}? (0 לא יגביל מספר נרשמים)`"
                            type="number"
                            :min="0"
                            :max="30"
                        ></v-text-field>
                    </v-col>
                </v-row>
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
        formValid: false,
        timeOptions: Delivery.TIME_OPTIONS,
    }),
    methods: {
        submit: function(){
            let delivery = new Delivery(
                {
                    date: this.content.date,
                    description: this.content.description,
                    timeOptions: this.content.timeOptions
                }
            )
            this.$emit('onSubmit', delivery);
        }
    }
}
</script>
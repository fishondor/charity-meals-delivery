<template>
    <v-form
        id="delivery-registration-form"
        ref="form"
        v-model="formValid"
    >
        <v-container>
            <v-row>
                <v-col
                    cols="12"
                    md="6"
                >
                    <v-text-field
                        id="delivery-registration-form-name"
                        v-model="content.name"
                        label="שם"
                        :disabled="!!user.displayName"
                        required
                        outlined
                        dense
                    ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    md="6"
                >
                    <v-text-field
                        id="delivery-registration-form-email"
                        v-model="content.email"
                        label="מייל"
                        :disabled="!!user.email"
                        required
                        outlined
                        dense
                    ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    md="6"
                >
                    <vue-tel-input-vuetify 
                        id="delivery-registration-form-phone"
                        v-model="content.phone"
                        defaultCountry="IL"
                        :onlyCountries="['IL']"
                        :disabled="!!user.phoneNumber"
                        label="טלפון"
                        required 
                        outlined
                        dense
                        :rules="phoneRules"></vue-tel-input-vuetify>
                </v-col>
                <v-col
                    cols="12"
                    md="6"
                >
                    <v-text-field
                        id="delivery-registration-form-pickups"
                        v-model="content.pickupsNumber"
                        label="כמה איסופים יכול לבצע?"
                        type="number"
                        :min="minPickups"
                        :max="maxPickups"
                        :rules="numberRules"
                        required
                        outlined
                        dense
                    ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    md="6"
                >
                    <v-select
                        v-if="timeOptions && timeOptions.length"
                        id="delivery-registration-form-time"
                        v-model="content.time"
                        :items="timeOptions"
                        label="מבקש להרשם לחלוקה בשעה"
                        dense
                        outlined
                        item-text="time"
                    ></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                    cols="12"
                    md="6"
                >
                    <v-btn
                        id="delivery-registration-form-submit"
                        color="primary"
                        @click="submit"
                        >
                        הרשם
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
import Carrier from '../models/Carrier'

const MIN_PICKUPS = 1
const MAX_PICKUPS = 3

export default {
    data: () => ({
        content: {
            name: "",
            phone: "",
            pickupsNumber: 1,
            email: "",
            time: ""
        },
        user: {},
        formValid: false,
        phoneRules: [
            v => !!v || 'נא למלא מספר טלפון',
        ],
        numberRules: [
            v => v >= 1 && v <=3 || `ניתן לבצא בין ${MIN_PICKUPS} ל${MAX_PICKUPS} איסופים`
        ],
        minPickups: MIN_PICKUPS,
        maxPickups: MAX_PICKUPS,
        timeOptions: []
    }),
    async mounted(){
        this.user = await this.$firebaseService.getCurrentUser();
        this.content.name = this.user.displayName;
        this.content.email = this.user.email;
        this.content.phone = this.user.phoneNumber;
    },
    async created(){
        let deliveryId = this.$route.params.id
        this.$firebaseService.getRef(deliveryId, 'timeOptions').on('value', (snapshot) => {
            this.timeOptions = snapshot.val()
        });
    },
    methods: {
        submit: function(){
            this.$refs.form.validate()
            let carrier = new Carrier(
                {
                    email: this.content.email,
                    name: this.content.name,
                    phone: this.content.phone,
                    pickupsNumber: this.content.pickupsNumber,
                    time: this.content.time,
                    uid: this.user.uid
                }
            )
            if(this.formValid)
                this.$emit('onSubmit', carrier);
        }
    }
}
</script>
<template>
    <v-form
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
                        v-model="content.name"
                        label="שם"
                        :disabled="!!user.displayName"
                        required
                    ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    md="6"
                >
                    <v-text-field
                        v-model="content.email"
                        label="מייל"
                        :disabled="!!user.email"
                        required
                    ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    md="6"
                >
                    <vue-tel-input-vuetify 
                        v-model="content.phone"
                        defaultCountry="IL"
                        :onlyCountries="['IL']"
                        :disabled="!!user.phoneNumber"
                        label="טלפון"
                        required 
                        :rules="phoneRules"></vue-tel-input-vuetify>
                </v-col>
                <v-col
                    cols="12"
                    md="6"
                >
                    <v-text-field
                        v-model="content.pickupsNumber"
                        label="כמה איסופים יכול לבצע?"
                        type="number"
                        :min="minPickups"
                        :max="maxPickups"
                        :rules="numberRules"
                        required
                    ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    md="6"
                >
                    <v-btn
                        color="primary"
                        class="mr-4"
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
            email: ""
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
        maxPickups: MAX_PICKUPS
    }),
    async mounted(){
        this.user = await this.$firebaseService.getCurrentUser();
        this.content.name = this.user.displayName;
        this.content.email = this.user.email;
        this.content.phone = this.user.phoneNumber;
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
                    uid: this.user.uid
                }
            )
            if(this.formValid)
                this.$emit('onSubmit', carrier);
        }
    }
}
</script>
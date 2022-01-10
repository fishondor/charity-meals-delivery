<template>
  <v-form 
    ref="form"
    v-model="formValid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="content.name"
            :counter="34"
            label="שם מלא"
            required
            :rules="rules.required"
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
                label="טלפון"
                required 
                :rules="rules.required"></vue-tel-input-vuetify>
        </v-col>

        <v-col
          cols="12"
        >
            <v-text-field
                v-model="content.address"
                required 
                :rules="rules.required"
                label="כתובת לאיסוף"
            ></v-text-field>
        </v-col>
        <v-col
          cols="12"
        >
          <v-text-field
                v-model="content.description"
                required 
                :rules="rules.required"
                label="מה מכינים?"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
        >
            <v-btn
                color="info"
                class="mr-4"
                @click="submit"
                :disabled="!formValid"
                >
                הוסף
            </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import Pickup from '../models/Pickup'

export default {
    data: () => ({
        content: new Pickup({}),
        rules: {
          required: [v => !!v || 'נא למלא שדה זה']
        },
        formValid: false,
    }),
    methods: {
        submit: function(){
            this.$refs.form.validate()
            this.$emit('onSubmit',
                {
                    description: this.content.description,
                    address: this.content.address,
                    phone: this.content.phone,
                    name: this.content.name
                }
            );
            this.content = new Pickup({})
            this.$refs.form.reset()
        },
        getAddressData: function (addressData) {
            this.address = addressData;
        }
    }
}
</script>
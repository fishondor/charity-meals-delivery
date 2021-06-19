<template>
  <v-form v-model="formValid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="content.name"
            :counter="10"
            label="Full name"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
            <vue-tel-input-vuetify
                v-model="content.phone"
                required></vue-tel-input-vuetify>
        </v-col>

        <v-col
          cols="12"
        >
            <vuetify-google-autocomplete
                id="map"
                v-bind:disabled="false"
                placeholder="Addres. Start typing"
                v-on:placechanged="getAddressData"
                v-model="content.address"
            >
            </vuetify-google-autocomplete>
        </v-col>
        <v-col
          cols="12"
        >
          <v-text-field
                v-model="content.description"
                label="Description"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
        >
            <v-btn
                color="success"
                class="mr-4"
                @click="submit"
                >
                Create
            </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
    data: () => ({
        content: {
            description: "",
            address: "",
            phone: "",
            name: ""
        },
        formValid: false
    }),
    methods: {
        submit: function(){
            this.$emit('onSubmit',
                {
                    description: this.content.description,
                    address: this.content.address,
                    phone: this.content.phone,
                    name: this.content.name
                }
            );
        },
        getAddressData: function (addressData, placeResultData, id) {
            console.log("place", placeResultData)
            console.log("id", id)
            this.address = addressData;
        }
    }
}
</script>
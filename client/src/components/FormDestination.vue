<template>
  <v-form v-model="formValid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="content.name"
            :counter="34"
            label="Name"
            required
            dense
            outlined
            :disabled="!editable"
            @change="onChange('name')"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
            <vue-tel-input-vuetify
                v-model="content.phone"
                label="Phone"
                required
                dense
                outlined
                :disabled="!editable"
                @change="onChange('phone')"></vue-tel-input-vuetify>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
            <v-text-field
                    v-model="content.address"
                    label="Address"
                    dense
                    outlined
                    @change="onChange('address')"
                    :disabled="!editable"
            ></v-text-field>
            <!-- <vuetify-google-autocomplete
                id="map"
                v-bind:disabled="false"
                placeholder="Addres. Start typing"
                v-on:placechanged="getAddressData"
                v-model="content.address"
            >
            </vuetify-google-autocomplete> -->
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
    props: {
        editable: {
            type: Boolean,
            default: false
        },
        content: {
            type: Object,
            default(){
              return {
                address: "",
                phone: "",
                name: ""
              }
            }
        }
    },
    data: () => ({
        formValid: false
    }),
    methods: {
        onChange: function(itemKey) {
          this.$emit('onChange', itemKey, this.content[itemKey])
        },
        getAddressData: function (addressData) {
            this.address = addressData;
        }
    }
}
</script>
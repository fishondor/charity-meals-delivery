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
          >
          </v-text-field>
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
                @change="onChange('phone')">
                <template v-slot:append>
                  <a :href="`tel:${content.phone}`">
                    <v-icon
                        small
                    >
                        {{icons.phone}}
                    </v-icon>
                  </a>
                </template>
              </vue-tel-input-vuetify>
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
            >
              <template v-slot:append>
                <a :href="content.address | wazeUrl">
                    <v-icon
                        small
                    >
                        {{icons.waze}}
                    </v-icon>
                </a>
              </template>
            </v-text-field>
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
import {
    phone,
    waze
} from './icons'

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
        formValid: false,
        icons: {
          phone,
          waze
        }
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
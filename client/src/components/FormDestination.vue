<template>
  <v-form v-model="formValid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field v-if="editable"
            v-model="content.name"
            :counter="34"
            label="שם"
            required
            dense
            outlined
            :disabled="!editable"
            @change="onChange('name')"
          >
          </v-text-field>
          <p v-else class="d-flex justify-space-between mb-0">
            {{content.name}}
          </p>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
            <vue-tel-input-vuetify v-if="editable"
                v-model="content.phone"
                label="טלפון"
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
              <p v-else class="d-flex justify-space-between mb-0">
                <span>טלפון: {{content.phone}}</span>&nbsp;&nbsp;
                <a :href="`tel:${content.phone}`">
                  <v-icon>
                      {{icons.phone}}
                  </v-icon>
                </a>
              </p>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
            <v-text-field v-if="editable"
                    v-model="content.address"
                    label="כתובת"
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
            <p v-else class="d-flex justify-space-between mb-0">
              <span>כתובת: {{content.address}}</span>&nbsp;&nbsp;
              <a :href="content.address | wazeUrl">
                  <v-icon>
                      {{icons.waze}}
                  </v-icon>
              </a>
            </p>
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
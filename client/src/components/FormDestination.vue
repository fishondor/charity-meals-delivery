<template>
  <v-container>
    <v-form v-if="editable" v-model="formValid">
      <v-row>
        <v-col 
          cols="12"
          md="12"
        >
          <v-checkbox
            v-model="content.done"
            color="success"
            hide-details
            @change="onChange('done')"
            :disabled="doneDisabled"
            label="נמסר"
            class="mt-0 pt-0"
          ></v-checkbox>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
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
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
            <vue-tel-input-vuetify
                v-model="content.phone"
                label="טלפון"
                required
                dense
                outlined
                :disabled="!editable"
                @change="onChange('phone')">
              </vue-tel-input-vuetify>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
            <v-text-field
                    v-model="content.address"
                    label="כתובת"
                    dense
                    outlined
                    @change="onChange('address')"
                    :disabled="!editable"
            >
            </v-text-field>
        </v-col>
      </v-row>
    </v-form>
    <v-data-table v-else
      :headers="headers"
      :items="[content]"
      class="elevation-0 mb-0"
      :hide-default-footer="true"
    >
      <template v-slot:[`item.phone`]="{ item }">
        <span>{{item.phone}}</span>&nbsp;&nbsp;
        <a :href="`tel:${item.phone}`">
          <v-icon>
              {{icons.phone}}
          </v-icon>
        </a>
      </template>
      <template v-slot:[`item.address`]="{ item }">
        <span>{{item.address}}</span>&nbsp;&nbsp;
        <a :href="item.address | wazeUrl">
            <v-icon>
                {{icons.waze}}
            </v-icon>
        </a>
      </template>
      <template v-slot:[`item.done`]="{ item }">
        <v-checkbox
          v-model="item.done"
          color="success"
          hide-details
          @change="onChange('done')"
          :disabled="doneDisabled"
          class="mt-0 pt-0"
        ></v-checkbox>
      </template>
    </v-data-table>
  </v-container>
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
        doneDisabled: {
            type: Boolean,
            default: true
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
        },
        headers: [
            { text: 'נמסר', value: 'done', sortable: false},
            { text: 'שם', value: 'name', sortable: false },
            { text: 'טלפון', value: 'phone', sortable: false },
            { text: 'כתובת', value: 'address', sortable: false }
        ],
    }),
    methods: {
        onChange: function(itemKey) {
          this.$emit('onChange', itemKey, this.content[itemKey])
        }
    }
}
</script>
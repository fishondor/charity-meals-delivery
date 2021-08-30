<template>
    <v-data-table
      :headers="headers"
      :items="[content]"
      class="table-destination elevation-0 mb-0"
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
</template>

<script>
import {
    phone,
    waze
} from './icons'

export default {
    props: {
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
        icons: {
          phone,
          waze
        },
        headers: [
            { text: 'נמסר', value: 'done', sortable: false},
            { text: 'שם', value: 'name', sortable: false, cellClass: "destination-name" },
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
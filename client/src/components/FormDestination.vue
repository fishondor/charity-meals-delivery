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
    <v-simple-table v-else>
      <template v-slot:default>
          <thead>
              <tr>
                  <th>
                      נמסר
                  </th>
                  <th>
                      שם
                  </th>
                  <th>
                      טלפון
                  </th>
                  <th>
                      כתובת
                  </th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td>
                    <v-checkbox
                      v-model="content.done"
                      color="success"
                      hide-details
                      @change="onChange('done')"
                      :disabled="doneDisabled"
                      label="נמסר"
                      class="mt-0 pt-0"
                    ></v-checkbox>
                  </td>
                  <td>{{ content.name }}</td>
                  <td>
                    <span>{{content.phone}}</span>&nbsp;&nbsp;
                    <a :href="`tel:${content.phone}`">
                      <v-icon>
                          {{icons.phone}}
                      </v-icon>
                    </a>  
                  </td>
                  <td>
                    <span>{{content.address}}</span>&nbsp;&nbsp;
                    <a :href="content.address | wazeUrl">
                        <v-icon>
                            {{icons.waze}}
                        </v-icon>
                    </a>
                  </td>
              </tr>
          </tbody>
      </template>
  </v-simple-table>
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
        }
    }),
    methods: {
        onChange: function(itemKey) {
          this.$emit('onChange', itemKey, this.content[itemKey])
        }
    }
}
</script>
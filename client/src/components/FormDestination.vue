<template>
    <v-form v-model="formValid">
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            class="form-destination-name"
            v-model="content.name"
            :counter="34"
            label="שם"
            required
            dense
            outlined
            @change="onChange('name')"
          >
          </v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
            <vue-tel-input-vuetify
                class="form-destination-phone"
                v-model="content.phone"
                label="טלפון"
                defaultCountry="IL"
                :onlyCountries="['IL']"
                required
                dense
                outlined
                @change="onChange('phone')">
              </vue-tel-input-vuetify>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
            <v-text-field
                    class="form-destination-address"
                    v-model="content.address"
                    label="כתובת (תשמש בקישור לווייז)"
                    dense
                    outlined
                    @change="onChange('address')"
            >
            </v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
            <v-text-field
                    class="form-destination-description"
                    v-model="content.description"
                    label="הערות (קומה, דירה, תיאור המקום וכו׳)"
                    dense
                    outlined
                    @change="onChange('description')"
            >
            </v-text-field>
        </v-col>
      </v-row>
    </v-form>
</template>

<script>
export default {
    props: {
        content: {
            type: Object,
            default(){
              return {
                address: "",
                phone: "",
                name: "",
                description: ""
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
        }
    }
}
</script>
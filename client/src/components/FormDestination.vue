<template>
    <v-form v-model="formValid">
      <v-row>
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
        }
    }
}
</script>
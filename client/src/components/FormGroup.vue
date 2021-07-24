<template>
  <v-form
        ref="form" 
        v-model="formValid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
        >
            <v-text-field
                v-model="content.description"
                label="תיאור"
                required
                :rules="[requiredField]"
            ></v-text-field>
        </v-col>
        <v-col
          cols="12"
        >
            <v-text-field
                v-model="content.index"
                type="number"
                label="מספר משלוח"
                :rules="[indexesRules, requiredField]"
                required
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
                צור
            </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
    props: {
        indexes: {
            type: Array,
            default(){
                return null
            }
        }
    },
    data: () => ({
        content: {
            description: "",
            index: null
        },
        formValid: false,
        requiredField: v => v != "" || 'שדה זה הוא חובה'
    }),
    created(){
        for(let i = 1; i <= this.indexes.length + 1; i++){
            if(!this.indexes.includes(i)){
                this.content.index = i
                return
            }
        }
    },
    methods: {
        submit: function(){
            this.$refs.form.validate()
            if(this.formValid)
                this.$emit('onSubmit',
                    {
                        description: this.content.description,
                        index: this.content.index
                    }
                );
        },
        indexesRules: function(v){
            return !this.indexes.includes(parseInt(v)) || 
                `מספר זה כבר נמצא בשימוש. אנא בחר מספר שאינו בין המספרים הקיימים: ${this.indexes.sort((a,b) => a - b).join(', ')}`
        }
    }
}
</script>
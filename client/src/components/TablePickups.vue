<template>
  <v-data-table
    :headers="headers"
    :items="group.pickups"
    sort-by="name"
    class="elevation-1 mb-10"
    :hide-default-footer="hideFooter"
  >
    <template v-slot:item.phone="{ item }">
        <div class="d-flex justify-space-between">
            <span>{{item.phone}}</span>&nbsp;&nbsp;
            <a :href="`tel:${item.phone}`">
                <v-icon>
                    {{icons.phone}}
                </v-icon>
            </a>
        </div>
    </template>
    <template v-slot:item.address="{ item }">
        <div class="d-flex justify-space-between">
            <span>{{item.address}}</span>&nbsp;&nbsp;
            <a :href="item.address | wazeUrl">
                <v-icon>
                    {{icons.waze}}
                </v-icon>
            </a>
        </div>
    </template>
    <template v-slot:item.done="{ item }">
        <v-simple-checkbox
            v-model="item.done"
            :ripple="false"
            color="success"
            @click="doneChanged(item)"
        ></v-simple-checkbox>
    </template>
    <template v-slot:footer>
        <v-container class="pb-0">
            <h3 class="mb-0">יעד המסירה</h3>
        </v-container>
        <FormDestination 
            :editable="editable" 
            :content="group.destination" 
            @onChange="onDestinationChange"
            :doneDisabled="!pickupsCompleted" />
    </template>
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <template v-if="group.index">
            <v-toolbar-title>{{group.index}}</v-toolbar-title>
        </template>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-toolbar-title>{{group.description || 'Pickups'}}</v-toolbar-title>
        <template v-if="carriers.length">
            <v-divider
                class="mx-4"
                inset
                vertical
            ></v-divider>
            <v-toolbar-title>
                <v-select
                    :items="carriers"
                    label="Select carrier"
                    outlined
                    dense
                    hide-details
                    clearable
                    item-text="name"
                    item-value="id"
                    item-disabled="disabled"
                    @change="carrierChanged"
                    v-model="group.carrier"
                ></v-select>
            </v-toolbar-title>
        </template>
        <v-spacer></v-spacer>
        <v-dialog
            v-if="editable" 
            v-model="dialog"
            max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              הוסף איסוף
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
                <FormPickup @onSubmit="save" />
            </v-card-text>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-if="editable" v-slot:item.actions="{ item }">
      <v-icon
        small
        @click="deleteItem(item)"
      >
        {{icons.delete}}
      </v-icon>
    </template>
  </v-data-table>
</template>
<script>
import FormPickup from '../components/FormPickup'
import FormDestination from '../components/FormDestination'
import {
    edit, 
    deleteIcon,
    phone,
    waze
} from './icons'

import Group from '../models/Group'

export default {
    props: {
        group: {
            type: Group,
            default() {
                return {}
            }
        },
        editable: {
            type: Boolean,
            default: false
        },
        hideFooter: {
            type: Boolean,
            default: false
        },
        carriers: {
            type: Array,
            default(){
                return []
            }
        }
    },
    components: {
        FormPickup,
        FormDestination
    },
    data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
            { text: 'נאסף', value: 'done', sortable: false},
            { text: 'שם', value: 'name', sortable: false },
            { text: 'טלפון', value: 'phone', sortable: false },
            { text: 'כתובת', value: 'address', sortable: false },
            { text: 'מכינים', value: 'description', sortable: false },
            { text: '', value: 'actions', sortable: false }
        ],
        pickups: [],
        editedIndex: -1,
        editedItem: {
            name: '',
            phone: '',
            address: '',
            description: '',
        },
        defaultItem: {
            name: '',
            phone: '',
            address: '',
            description: '',
        },
        icons: {
            edit: edit,
            delete: deleteIcon,
            phone: phone,
            waze: waze
        },
        idToDelete: null
    }),

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
        pickupsCompleted () {
            let pickups = this.group.pickups
            for(let i = 0; i < pickups.length; i++){
                if(!pickups[i].done) return false
            }
            return true
        }
    },

    watch: {
        dialog (val) {
            val || this.close()
        },
        dialogDelete (val) {
            val || this.closeDelete()
        },
    },

    created(){
        this.deliveryId = this.$route.params.id
    },

    methods: {

        editItem (item) {
            this.editedIndex = this.pickups.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            this.idToDelete = item.id
            this.dialogDelete = true
        },

        deleteItemConfirm () {
            this.$emit('onDelete', this.group.id, this.idToDelete);
            this.idToDelete = null
            this.closeDelete()
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save (pickup) {
            this.$emit('onSave', this.group.id, pickup);
            this.close()
        },

        carrierChanged() {
            this.$emit('onCarrierChange', this.group.id, this.group.carrier)
        },

        doneChanged(pickup) {
            this.$firebaseService.getRef(this.deliveryId, `groups/${this.group.id}/pickups/${pickup.id}`).update(
                {
                    done: pickup.done
                }
            )
        },

        onDestinationChange(itemKey, itemValue) {
            let update = {}
            update[itemKey] = itemValue
            this.$firebaseService.getRef(this.deliveryId, `groups/${this.group.id}/destination`).update(update)
        }
    }
  }
</script>
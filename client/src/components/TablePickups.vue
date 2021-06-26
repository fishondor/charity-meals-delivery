<template>
  <v-data-table
    :headers="headers"
    :items="group.pickups"
    sort-by="name"
    class="elevation-1 mb-10"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>{{group.description || 'Pickups'}}</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <template v-if="group.index">
            <v-toolbar-title>{{group.index}}</v-toolbar-title>
            <v-divider
            class="mx-4"
            inset
            vertical
            ></v-divider>
        </template>
        <v-spacer></v-spacer>
        <v-dialog
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
              New Item
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
    <template v-slot:item.actions="{ item }">
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
import {edit, deleteIcon} from '../components/icons'

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
        }
    },
    components: {
        FormPickup
    },
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Phone', value: 'phone', sortable: false },
        { text: 'Address', value: 'address' },
        { text: 'Description', value: 'description', sortable: false },
        { text: '', value: 'actions', sortable: false },
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
          delete: deleteIcon
      },
      idToDelete: null
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
    },
  }
</script>
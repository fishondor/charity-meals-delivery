<template>
  <v-card elevation="0">
    <v-list>
      <v-list-item-group
        v-model="selectedDestinations"
        multiple
        @change="itemClicked()"
      >
        <template v-for="(item, i) in destinations">
          <v-list-item
            :key="`item-${i}`"
            :value="item"
            active-class="deep-purple--text text--accent-4"
          >
            <template v-slot:default="{ active }">
              <v-list-item-content>
                <v-list-item-title v-text="`${item.index} | ${item.description}`"></v-list-item-title>
                <v-list-item-subtitle v-text="item.name"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-checkbox
                  :input-value="active"
                  color="deep-purple accent-4"
                ></v-checkbox>
              </v-list-item-action>
            </template>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>

export default {
    props: {
        destinations: {
            type: Array,
            default() {
                return []
            }
        },
    },
    data: () => ({
        selectedDestinations: []
    }),
    methods: {
        itemClicked(){
            this.$emit('change', this.selectedDestinations)
        }
    }
}
</script>
<template>
    <v-autocomplete
        class="group-destination-select"
        :items="destinations"
        label="בחר מרשימה"
        outlined
        dense
        hide-details
        clearable
        item-text="name"
        :item-value="item => item"
        @change="destinationChanged"
        v-model="destination"
    ></v-autocomplete>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data: () => ({
        destination: null
    }),
    computed: mapState({
        destinations: state => state.destinations
    }),
    methods: {
        destinationChanged: function(){
            this.$emit('onSelected', this.destination)
        }
    }
}
</script>
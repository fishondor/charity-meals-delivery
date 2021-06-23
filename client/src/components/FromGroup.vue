<template>
    <vue-repeater v-model="fields"></vue-repeater>
</template>
<script>
import VueRepeater from 'vue-repeater'
import 'vue-repeater/dist/vue-repeater.css'

export default {
    data () {
        return {
            fields: [
                {
                    name: 'FormPickup',
                    value: {}
                }
            ]
        }
    }
}
</script>
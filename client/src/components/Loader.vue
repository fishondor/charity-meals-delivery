<template>
    <div v-if="loader.show" class="loader-container">
        <v-progress-circular
            :size="50"
            :width="4"
            color="blue lighten-2"
            indeterminate
        ></v-progress-circular>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data(){
        return{
            timeout: 5000
        }
    },
    computed: mapState({
        loader: state => state.loader
    })
}
</script>

<style lang="postcss" scoped>
.loader-container{
    width: 100vw;
    height: 100vh;
    background: rgba(255, 255, 255, .9);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
}
</style>
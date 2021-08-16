<template>
    <div>
        <Hero />
        <v-container>
            <Amenities />
        </v-container>
        <v-container fluid>
            <img src="@/assets/multiple_carriers.jpg" />
        </v-container>
        <v-container fluid>
            <Attributions />
        </v-container>
    </div>
</template>

<script>
export default {
    components: {
        Hero: () => import('../components/Hero'),
        Amenities: () => import('../components/Amenities.vue'),
        Attributions: () => import('../components/Attributions.vue')
    }
}
</script>

<style lang="scss">
.attribution {
    direction: ltr;
    font-size: 8px;

    ul {
        padding: 0;

        li {
            display: inline;
        }
    } 
}
img {
    max-width: 100%;
    border-radius: 5px; 
}
</style>
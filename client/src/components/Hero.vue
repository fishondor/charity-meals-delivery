<template>
    <v-container class="pa-0 mt-4" fluid>
        <v-row no-gutters>
            <v-col 
                cols="12"
                md="5"
                xs="12"
                class="header-images pa-3"
            >
                <img v-for="image in images" :key="image" :src="image" />
            </v-col>
            <v-col
                cols="12"
                md="7"
                xs="12"
                class="d-flex align-center justify-center pa-10">
                <h1 class="text-h1">
                    מחלקים ארוחות שישי
                </h1>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        images: [
            require('../assets/carrier_blue.jpg'),
            require('../assets/carrier_orange.jpg'),
            require('../assets/carrier_pink.jpg'),
            require('../assets/carrier_purple.jpg'),
        ]
    })
}
</script>

<style lang="scss" scoped>
.header-images {
    display: grid;
    grid-template-columns: 48% 48%;
    gap: 4%;

    img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
    }
}
</style>
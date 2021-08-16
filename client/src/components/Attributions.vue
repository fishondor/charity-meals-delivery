<template>
    <p class="attribution mb-0">* This website uses image from:
        <ul>
            <li v-for="(attribution, index) in attributions" :key="index">
                <a :href="attribution.href">{{attribution.text}}</a>
            </li>
        </ul>
    </p>
</template>

<script>
export default {
    data: () => ({
        attributions: [
            {
                href: 'https://www.vecteezy.com/free-vector/supporting',
                text: 'Supporting Vectors by Vecteezy'
            },
            {
                href: 'https://www.vecteezy.com/free-vector/cartoon',
                text: 'Cartoon Vectors by Vecteezy'
            },
            {
                href: 'https://75.2.80.54/free-vector/holiday',
                text: 'Holiday Vectors by Vecteezy'
            },
            {
                href: 'https://www.vecteezy.com/free-vector/food-charity',
                text: 'Food Charity Vectors by Vecteezy'
            },
            {
                href: 'https://www.vecteezy.com/free-vector/box',
                text: 'Box Vectors by Vecteezy'
            },
            {
                href: 'https://www.vecteezy.com/free-vector/food-donation',
                text: 'Food Donation Vectors by Vecteezy'
            },
        ]
    })
}
</script>
<template>
    <div class="login-container">
        <Login class="login" />
    </div>
</template>

<script>

export default {
    title: "Friday Meals, Login",
    components: {
        Login: () => import('../components/Login')
    }
}
</script>

<style lang="scss" scoped>
.login-container{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .login{
        margin: 60px 0;
    }
    .image{
        flex-grow: 1;
        height: 100%;
        width: 100%;
        overflow: hidden;
        position: relative;
        .shadow{
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: rgba(250,250,250,.6);
        }
        &:before{
            content: "";
            position: absolute;
            width: 200%;
            height: 200%;
            top: -50%;
            left: -50%;
            -webkit-transform: rotate(30deg);
            transform: rotate(30deg);
            background-size: contain;
            background-repeat: repeat;
        }
    }
}
</style>
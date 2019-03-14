<template>
    <div>
        <header-general routerTo='/home' headTitle="购物车" headClass="style3"></header-general>
        <footer-currency></footer-currency>
    </div>
</template>
<script>
import header from '../components/header.vue'
import footer from '../components/footer.vue'
export default {
    components:{
        'header-general':header,
        'footer-currency':footer
    }
}
</script>
<style scoped>

</style>


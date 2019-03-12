<template>
    <div>
        <header-general routerTo='/myself' headTitle='我的会员'></header-general>
        <div class="modify_phone">
            <span class="to_modifyTitle">修改手机号码</span>
            <div class="to_modify">
                <span>1345***4551</span>
                <img src="../assets/more.png" alt="">
            </div>
        </div>
        <div class="modify_sex">
            <span class="to_modifyTitle">性别</span>
            <div class="to_modify">
                <span>男</span>
                <img src="../assets/more.png" alt="">
            </div>
        </div>
        <div></div>
    </div>
</template>
<script>
import header from '../components/header.vue'
export default {
    components: {
        'header-general':header
    }
}
</script>
<style scoped>
.modify_phone{
    height: .5rem;
    background: #fff;
    margin-top: .01rem;
    font-size: .15rem;
}
 .to_modifyTitle{
    float: left;
    margin-left: .2rem;
    margin-top: .15rem;
}
 .to_modify{
    float: right;
    margin-top: .1rem;
    margin-right: .1rem;
    color: #888888;
}

 .to_modify img{
    width: .2rem;
    height: .2rem;
    position: relative;
    top: .04rem;
    left: .04rem;
}
.modify_sex{
    height: .5rem;
    background: #fff;
    margin-top: .1rem;
    font-size: .15rem;
}
</style>


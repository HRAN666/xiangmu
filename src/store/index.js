import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import shop_store from './modules/shop_store'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        shop_store
    },
    getters
})

export default store
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import shop_store from './modules/shop_store'
import global from './modules/global'
import selectStore from './modules/selectStore'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        shop_store,
        global,
        selectStore
    },
    getters
})

export default store
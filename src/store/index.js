import Vue from "vue";
import Vuex from 'vuex'

import bread from './bread/index.js'
import user from './user/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        bread,
        user
    }
})
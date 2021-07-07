import Vue from 'vue'
import Vuex from 'vuex'
import createVuexAlong from 'vuex-along'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: { user: null, },
  mutations: {
    //存储userinfo
    initUser(state, user) { state.user = user },
  },
  getters: {},
  plugins: [createVuexAlong({ name: 'xxxx_admin' })]
})

export default store

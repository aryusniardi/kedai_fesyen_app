import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebar: false,
  },
  mutations: {
    setSidebar: (state, value) => {
      state.sidebar = value
    }
  },
  actions: {
    setSidebar: ({commit}, value) => {
      commit('setSidebar', value)
    }
  },
  getters: {
    sidebar: state => state.sidebar
  },
  modules: {
    
  }
})

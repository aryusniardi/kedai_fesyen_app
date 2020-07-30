import Vue from 'vue'
import Vuex from 'vuex'
import alert from '../store/alert'
import auth from '../store/auth'
import dialog from '../store/dialog'

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
    alert,
    auth,
    dialog
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import alert from '../store/alert'
import auth from '../store/auth'
import dialog from '../store/dialog'
import cart from '../store/cart'
import region from '../store/region'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebar: false,
    prevUrl: '',
    payment: []
  },
  mutations: {
    setSidebar: (state, value) => {
      state.sidebar = value
    },
    setPrevUrl: (state, value) => {
      state.prevUrl = value
    },
    setPayment: (state, value) => {
      state.payment = value
    }
  },
  actions: {
    setSidebar: ({commit}, value) => {
      commit('setSidebar', value)
    },
    setPrevUrl: ({commit}, value) => {
      commit('setPrevUrl', value)
    },
    setPayment: ({commit}, value) => {
      commit('setPayment', value)
    }
  },
  getters: {
    sidebar: state => state.sidebar,
    prevUrl: state => state.prevUrl,
    payment: state => state.payment
  },
  modules: {
    alert,
    auth,
    cart,
    dialog,
    region
  }
})

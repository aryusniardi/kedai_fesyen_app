const empty = () => {
    return {
        carts: []
    }
}

const state = empty()

export default {
    namespaced: true,
    state,
    mutations: {
        insert: (state, payload) => {
            state.carts.push({
                id: payload.id,
                title: payload.title,
                image: payload.image,
                price: payload.price,
                weight: payload.weight,
                quantity: 1
            })
        },
        update: (state, payload) => {
            let idx = state.carts.indexOf(payload)

            state.carts.splice(idx, 1, {
                id: payload.id,
                title: payload.title,
                image: payload.image,
                price: payload.price,
                weight: payload.weight,
                quantity: ++payload.quantity
            })
            if (payload.quantity <= 0) {
                state.carts.splice(idx, 1)
            }
        },
        reduce: (state, payload) => {
            let idx = state.carts.indexOf(payload)
            state.carts.splice(idx, 1, {
                id: payload.id,
                title: payload.title,
                image: payload.image,
                price: payload.price,
                weight: payload.weight, 
                quantity: --payload.quantity
            });
            if (payload.quantity <= 0) {
                state.carts.splice(idx, 1)
            }
        },
        resetState(state) {
            Object.assign(state, empty())
        }
    },
    actions: {
        resetCartState({commit}) {
            commit('resetState')
        },
        add: ({state, commit}, payload) => {
            let cartItem = state.carts.find(item => item.id === payload.id)

            !cartItem ? commit('insert', payload) : commit('update', cartItem)
        },
        remove: ({state, commit}, payload) => {
            let cartItem = state.carts.find(item => item.id === payload.id) 
            !cartItem ? commit('insert', payload) : commit('reduce', cartItem)
        },
        set: (state, payload) => {
            state.carts = payload
        },
    },
    getters: {
        carts: state => state.carts,
        count: (state) => {
            return state.carts.length
        },
        
        totalQuantity: (state) => {
            if (state.carts.length > 0) {
                return state.carts.reduce((total, product) => total + product.quantity, 0)
            } else {
                return 0
            }
        },
        totalPrice: (state) => {
            if (state.carts.length > 0) {
                return state.carts.reduce((total, product) => total + product.quantity * product.price, 0)
            } else {
                return 0
            }
        },
        totalWeight: (state) => {
            if (state.carts.length > 0) {
                return state.carts.reduce((total, product) => (total + product.quantity) * product.weight, 0)
            } else {
                return 0
            }
        },
    }
}
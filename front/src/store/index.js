import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    indexes: [{
        'pair':'BNBBUSD',
        'rank': 0,
        'screener': 'CRYPTO',
        'exchange': 'BINANCE',
        'interval': '1m'
      },
      {'pair':'ADABUSD',
        'rank': 0,
        'screener': 'CRYPTO',
        'exchange': 'BINANCE',
        'interval': '1m'
      },
      {'pair':'TRYUSD',
        'rank': 0,
        'screener': 'forex',
        'exchange': 'FX_IDC',
        'interval': '1m'
      },
    ],
  },
  mutations: {
    updateRank(state,payload) {
      const existsAtIndex = state.indexes.findIndex(u => u.pair === payload.pair)
      if (existsAtIndex !== -1) {
        state.indexes[existsAtIndex].rank = payload.rank;
      }
    },
    addPairToTheList(state,pair) {
      state.indexes.push(pair)
    },
    removePairFromList(state,index) {
      state.indexes.splice(index,1)
    }
  },
  actions: {
    removePair(context,index) {
      context.commit('removePairFromList', index)
    },
    addPair(context,pair) {
      context.commit('addPairToTheList', pair)
    }
  },
  getters: {
    getIndexes(state) {
      return state.indexes;
    }
  },
  modules: {
  }
})

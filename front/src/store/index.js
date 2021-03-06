import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    indexes: [],
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
    addPairToAPI(state,pair) {
      var request = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({'pair':pair})
      };
      fetch(`${process.env.VUE_APP_API_ENDPOINT}/api/pair`, request);
    },

    removePairFromList(state,id) {
      var index = state.indexes.map(i => {
        return i.id;
      }).indexOf(id);
      state.indexes.splice(index, 1);
    },

    removePairFromAPI(state, id) {
      var request = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({'index_id':id})
      };
      fetch(`${process.env.VUE_APP_API_ENDPOINT}/api/pair`, request);
    },

    async initApi(state) {
      console.log("init...")
      const response = await fetch(
          `${process.env.VUE_APP_API_ENDPOINT}/api/pairs`,
          {
            method: 'GET',
          }
      );
      const responseData = await response.json();
      state.indexes.push(...responseData);
    }

  },
  actions: {
    removePair(context,id) {
      context.commit('removePairFromList', id)
      context.commit('removePairFromAPI', id)
    },
    addPair(context,pair) {
      context.commit('addPairToTheList', pair)
      context.commit('addPairToAPI', pair)
    },
  },
  getters: {
    getIndexes(state) {
      return state.indexes;
    }
  },
  modules: {
  }
})

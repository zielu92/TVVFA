import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    indexes: [],
    sound: false,
    rankSound: 15,
    loading: true,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    updateRank(state, payload) {
      const existsAtIndex = state.indexes.findIndex(u => u.pair === payload.pair)
      if (existsAtIndex !== -1) {
        Vue.set(state.indexes, existsAtIndex, {
          ...state.indexes[existsAtIndex],
          rank: payload.rank
        });
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
        return i._id;
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
      state.loading = true; 

      // Pairs
      const response = await fetch(
        `${process.env.VUE_APP_API_ENDPOINT}/api/pairs`,
        {
          method: 'GET',
        }
      );
      const responseData = await response.json();
      state.indexes.push(...responseData);

      // Settings
      const getSettings = await fetch(
        `${process.env.VUE_APP_API_ENDPOINT}/api/setting/all`,
        {
          method: 'GET',
        }
      );
      const responseSettingsData = await getSettings.json();
      if (responseSettingsData.success) {
        const settings = responseSettingsData.data;
        settings.forEach(setting => {
          if (setting.key === 'sound') {
            state.sound = setting.value === 'true'; 
          }
          if (setting.key === 'rankSound') {
            state.rankSound = parseInt(setting.value, 10); 
          }
        });
      }

      state.loading = false; 
    },

    created() {
      this.$store.commit('initApi');
    },

    saveSoundSetting(state) {
      state.sound = !state.sound;
      fetch(`${process.env.VUE_APP_API_ENDPOINT}/api/setting`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: 'sound', value: state.sound }),
      });
    },

    setRankSound(state, rank) {
      state.rankSound = rank;
      fetch(`${process.env.VUE_APP_API_ENDPOINT}/api/setting`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: 'rankSound', value: rank }),
      });
    }

  },
  actions: {
    async initialize({ commit }) {
      await commit('initApi');
    },
    removePair(context,id) {
      context.commit('removePairFromList', id)
      context.commit('removePairFromAPI', id)
    },
    addPair(context,pair) {
      context.commit('addPairToTheList', pair)
      context.commit('addPairToAPI', pair)
    },
    toggleSound({ commit, state }) {
      const newSoundState = !state.sound;
      commit('saveSoundSetting', newSoundState);
      if (newSoundState) {
        const audio = new Audio(require('@/assets/alert.mp3'));
        audio.play().catch(() => {
          commit('saveSoundSetting', false);
          alert('Unable to play sound. Sound has been disabled.');
        });
      }
    },
    setRankSound(context, rank) {
      context.commit('setRankSound', rank)
    },
    setSoundSetting({ commit }, soundState) {
      commit('saveSoundSetting', soundState);
    },
  },
  getters: {
    getIndexes(state) {
      return state.indexes;
    },
    getSoundSetting(state) {
      return state.sound;
    },
    getRankSound(state) {
      return state.rankSound;
    },
    isLoading(state) {
      return state.loading;
    },
  },
  modules: {
  }
})

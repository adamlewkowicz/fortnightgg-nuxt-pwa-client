import axios from 'axios';

let timeout = null;

const delayAction = (fn, ms = 1000) => {
  clearTimeout(timeout);
  setTimeout(() => fn(), ms);
}


const stats = {
	state: {
    playerName: '',
    general: {},
    all: [],
    history: [],
    isUpdating: false
	},
	mutations: {
		GET_STATS (state, payload) {
      state.general = payload.general;
      state.all = payload.all;
      state.history = payload.history;
    },
    UPDATE_STATS (state, payload) {
      for (const prop in payload) {
        state[prop] = payload[prop];
      }
    },
    CHANGE_PLAYERNAME (state, playerName) {
      state.playerName = playerName;
    },
    CHANGE_UPDATING_STATUS (state, status) {
      state.isUpdating = status;
    }
	},
	actions: {
		async getStats ({ dispatch, commit }, playerName) {
      const { data: { stats }} = await axios.get(`http://localhost:4000/stats/${playerName}`);
      console.log('CALLED GET STATS')

      if (Object.keys(stats).length && stats.all.length) commit('GET_STATS', stats);
      else await dispatch('updateStats', playerName);
		},
		async updateStats ({ commit,state }, playerName) {
      console.log('UPDEJCIK', playerName)
      commit('CHANGE_UPDATING_STATUS', true);
      const { data: { stats }} = await axios.patch(`http://localhost:4000/stats/${playerName}`);
      commit('CHANGE_UPDATING_STATUS', false);
      if (Object.keys(stats).length && state.playerName.toLowerCase() === stats.general.name.toLowerCase()) {
        commit('UPDATE_STATS', stats);
      }
		}
	}
}

export default stats;

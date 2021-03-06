import moment from 'moment';

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
    live: [],
    isUpdating: false
	},
	mutations: {
		GET_STATS (state, payload) {
      state.general = payload.general;
      state.all = payload.all;
      state.history = payload.history;
      state.live = payload.live;
    },
    UPDATE_STATS (state, payload) {
      for (const prop in payload) {
        state[prop] = payload[prop];
      }
    },
    ADD_LIVE_MATCH (state) {
      state.live.unshift({ data: moment().format('YYYY-MM-DD HH:mm:ss'), place: 'Winner', score: 333 });
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
      const { stats } = await this.$axios.$get(`/stats/${encodeURI(playerName)}`);
      console.log('CALLED GET STATS')
      if (Object.keys(stats).length && stats.all.length) commit('GET_STATS', stats);
      else await dispatch('updateStats', playerName);
		},
		async updateStats ({ commit,state }, playerName) {
      console.log('CALLED UPDATE STATS: ', playerName)
      commit('CHANGE_UPDATING_STATUS', true);
      const { stats } = await this.$axios.$patch(`/stats/${encodeURI(playerName)}`);
      commit('CHANGE_UPDATING_STATUS', false);
      if (stats && Object.keys(stats).length && state.playerName.toLowerCase() === stats.general.name.toLowerCase()) {
        commit('UPDATE_STATS', stats);
      }
		}
  }
}

export default stats;

import Vuex from 'vuex';

import stats from './stats';

const createStore = () => {
	return new Vuex.Store({
		modules: {
			stats
		}
	});
}

export default createStore
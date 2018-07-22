import Vuex from 'vuex';

import stats from './stats';
import items from './items';

const createStore = () => {
	return new Vuex.Store({
		modules: {
      stats,
      items
		}
	});
}

export default createStore

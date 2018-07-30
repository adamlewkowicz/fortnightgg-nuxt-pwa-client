import Vuex from 'vuex';

import date from './date';
import stats from './stats';
import items from './items';

const createStore = () => {
	return new Vuex.Store({
		modules: {
      date,
      stats,
      items
		}
	});
}

export default createStore

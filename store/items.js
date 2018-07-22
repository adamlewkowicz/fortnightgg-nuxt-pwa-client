

const items = {
  state: {
    filters: {
      name: '',
      types: [],
    },
    items: []
  },
  mutations: {
    GET_ITEMS (state, payload) {
      state.items = payload.items;
    },
    CLEAR_ITEMS_FILTERS (state) {
      state.filters.name = '';
      state.filters.types = [];
    },
    FILTER_BY_NAME (state, name) {
      state.filters.name = name;
    },
    ADD_ITEM_TYPE (state, itemType) {
      state.filters.types.push(itemType);
    },
    DELETE_ITEM_TYPE (state, itemType) {
      const index = state.filters.types.indexOf(itemType);
      state.filters.types.splice(index, 1);
    },
    UPDATE_ITEMS_FILTERS (state, payload) {
      for (const prop in payload) {
        state.filters[prop] = payload[prop];
      }
      // state.filters[] =
    }
  },
  actions: {
    async getItems ({ commit }) {
      commit('GET_ITEMS', await this.$axios.$get(`/items`));
    }
  },
  getters: {
    itemsTypes: state => {
      return state.items
        .reduce((types, item) => types.some(type => type === item.type_name) ? types : [...types, item.type_name], []);
    },
    filteredTypes: (state, getters) => {
      return !state.filters.types.length ? getters.itemsTypes : state.filters.types
    },
    filteredItems: (state, getters) => {
      return state.items
        .filter(item => item.weapon_name.toLowerCase().indexOf(state.filters.name) !== -1)
        .filter(item => getters.filteredTypes.some(type => item.type_name === type))
    }
  }
}

export default items;

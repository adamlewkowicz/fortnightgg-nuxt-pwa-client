const items = {
  state: {
    filters: {
      name: '',
      types: [],
    },
    sortOptions: {
      prop: 'name',
      desc: false
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
    CLEAR_ITEMS_TYPES_FILTERS (state) {
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
    },
    SORT_ITEMS_BY (state, sortProp) {
      state.sortOptions.prop = sortProp;
    },
    SORT_ITEMS_DIRECTION (state) {
      state.sortOptions.desc = !state.sortOptions.desc;
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
        .reduce((types, item) => types.some(type => type === item.type) ? types : [...types, item.type], []);
    },
    filteredTypes: (state, getters) => {
      return !state.filters.types.length ? getters.itemsTypes : state.filters.types
    },
    normalizedItems: state => {
      return state.items.map(item => ({
        ...item,
        dps: parseFloat(item.dps),
        fireRate: parseFloat(item.fireRate),
        className: item.rarity.toLowerCase(),
        imgUrl: process.env.baseURL + '/static/' + item.img,
        imgAlt: 'Fortnite ' + item.rarity + ' ' + item.name + ' - ' + item.type
      }));
    },
    filteredItems: (state, getters) => {
      const { prop: sortProp, desc } = state.sortOptions;
      const sortValues = (a, b) => a > b ? (desc ? -1 : 1) : (desc ? 1 : -1);
      const rarityOrder = [
        'Common',
        'Uncommon',
        'Rare',
        'Epic',
        'Legendary'
      ];

      return getters.normalizedItems
        .map(item => ({...item, dps: parseFloat(item.dps) }))
        .filter(item => item.name.toLowerCase().indexOf(state.filters.name.toLowerCase()) !== -1)
        .filter(item => getters.filteredTypes.some(type => item.type === type))
        .sort((a, b) => {
          switch(sortProp) {
            case 'rarity':
              const aIndex = rarityOrder.indexOf(a.rarity);
              const bIndex = rarityOrder.indexOf(b.rarity);
              return sortValues(aIndex, bIndex);
            default:
              return sortValues(a[sortProp], b[sortProp]);
          }
        });
    }
  }
}

export default items;

<template>
  <nav>
    <label for="name-searcher">
      <h2>ITEM NAME:</h2>
    </label>

    <fg-text
      id="name-searcher"
      placeholder="Item name..."
      :value="filters.name"
      @input="filterByName"
    />

    <ul class="items-types-filters-wrapper">
      <li v-for="itemType in itemsTypes"
        :key="itemType"
        class="items-types">
        <label :for="itemType | htmlTag">
          {{ itemType }}
          <fg-checkbox
            :id="itemType | htmlTag"
            :value="itemType"
            :checked="!!filters.types.find(type => type === itemType)"
            @change="filerItemsTypes(itemType)"
          />
        </label>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: [
    'itemsTypes',
    'filters'
  ],
  data() {
    return {
      itemName: '',
      checkedItemsTypes: [],
      timeout: null
    }
  },
  methods: {
    ...mapMutations(['FILTER_ITEMS_BY_NAME']),
    filerItemsTypes(itemType) {
      const mutate = mutation => this.$store.commit(mutation, itemType);
      this.filters.types.includes(itemType) ? mutate('DELETE_ITEM_TYPE') : mutate('ADD_ITEM_TYPE');
    },
    filterByName(itemName) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => this.FILTER_ITEMS_BY_NAME(itemName), 300);
    }
  },
  filters: {
    htmlTag(val) {
      return val.toLowerCase().replace(/\s/g, "-");
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/index.scss";

#name-searcher {
  margin-bottom: 20px;
}

h2 {
  font-size: 13px;
  margin: 0 0 5px 0;
}

.items-types-filters-wrapper {
  margin: 0 0 10px 0;
  padding: 0;
  list-style-type: none;
  @include tablet {
    max-height: 135px;
    overflow-y: auto;
    background-color: #23243b;
    border-radius: 6px;
    padding: 5px 10px;
  }
}

.items-types {
  user-select: none;
  padding: 4px;
  box-sizing: border-box;
  margin: 5px 0;
}
</style>



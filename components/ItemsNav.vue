<template>
  <div>
    <label for="name-searcher">
      <h3>ITEM NAME:</h3>
    </label>
    <input type="text"
      id="name-searcher"
      v-model="itemName"
      placeholder="enter name..."
      @input="filterByName"
    />

    <!-- <h3>FILTER BY TYPE:</h3>
    <select v-model="filterItemsTypes"
      :size="itemsTypes.length"
      multiple>
      <option v-for="(itemType, itemTypeKey) in itemsTypes"
        :key="itemTypeKey">
        {{ itemType }}
      </option>
    </select> -->

    <!-- <div class="items-types-filters-wrapper">
      <div v-for="(itemType, itemTypeKey) in itemsTypes"
        :key="itemTypeKey"
        class="items-types">
        <label :for="type | htmlTag">
          {{ itemType }}
        </label>
        <input type="checkbox"
          :id="itemType | htmlTag"
          :value="itemType"
          @change="filerItemsTypes(itemType)"
        />
      </div>
    </div> -->

  </div>
</template>

<script>
export default {
  props: [
    'itemsTypes',
    'filters'
  ],
  data() {
    return {
      itemName: '',
      firstSort: true,
      filterItemsTypes: []
    }
  },
  methods: {
    filerItemsTypes(itemType) {
      const mutate = mutation => this.$store.commit(mutation, itemType);
      this.filters.types.some(type => type === itemType) ? mutate('DELETE_ITEM_TYPE') : mutate('ADD_ITEM_TYPE');
    },
    filterByName() {
      this.$store.commit('FILTER_BY_NAME', this.itemName);
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
  border-style: none;
  padding: 14px 10px;
  color: #fff;
  border-radius: 6px;
  background-color: #373971;
  outline: none;
  box-sizing: border-box;
  margin-bottom: 20px;
  // border: 1px solid #373971;
  transition: box-shadow .3s ease;
  &:hover { box-shadow: 0px 0px 30px 6px rgba(18, 19, 56, .5); }
  &:focus { background-color: #363a94; }
  &::placeholder {
    color: rgba(255,255,255,.3);
  }
  @include tablet {
    width: 100%;
  }
}

h3 {
  font-size: 12px;
  margin: 6px 0;
}

.items-types-filters-wrapper {
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



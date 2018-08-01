<template>
  <div class="items-page-wrapper">

    <items-nav
      class="items-nav"
      :itemsTypes="itemsTypes"
      :filters="filters"
    />



    <div class="items-filters-container">
      <!-- <items-filters :filters="filters"/> -->
      <h3>SORT BY:</h3>
      <div class="sort-wrapper">
        <select @change="SORT_ITEMS_BY($event.target.value)">
          <option v-for="(sort, sortKey) in sortTypes"
            :key="sortKey"
            :value="sort">
            {{ sort === 'magSize' ? 'Magazine size' : sort | upperFirstChar }}
          </option>
        </select>
        <checkbox-arrow
          :value="sortOptions.desc"
          @checkboxClick="SORT_ITEMS_DIRECTION"
        />
      </div>

      <transition-group tag="div" v-show="filteredItems.length" name="list" class="items-wrapper">
        <item
          v-for="item in filteredItems"
          :key="item.id"
          :item="item"
          @choosenItem="choosenItem = $event">
        </item>
      </transition-group>
      <div v-show="!filteredItems.length" class="filters-fail">
        <p>No items were found for your filters</p>
        <button @click="CLEAR_ITEMS_FILTERS">Clear filters</button>
      </div>

    </div>

    <item-details
      v-if="choosenItem"
      :item="choosenItem"
      @closeDetails="choosenItem = null"
    />

  </div>
</template>


<script>
import { mapGetters, mapMutations } from 'vuex';
import Item from '@/components/Item';
import ItemsNav from '@/components/ItemsNav';
import ItemsFilters from '@/components/ItemsFilters';
import ItemDetails from '@/components/ItemDetails';
import CheckboxArrow from '@/components/CheckboxArrow';

export default {
  components: {
    Item,
    ItemsNav,
    ItemsFilters,
    ItemDetails,
    CheckboxArrow
  },
  data() {
    return {
      itemPhrase: '',
      id: 0,
      choosenItem: null,
      sortTypes: ['name', 'damage', 'rarity', 'magSize', 'headshot', 'dps']
    }
  },
  methods: {
    ...mapMutations([
      'CLEAR_ITEMS_FILTERS',
      'SORT_ITEMS_BY',
      'SORT_ITEMS_DIRECTION'
    ])
  },
  computed: {
    ...mapGetters([
      'filteredItems',
      'filteredTypes',
      'itemsTypes'
    ]),
    sortOptions() {
      return this.$store.state.items.sortOptions;
    },
    filters() {
      return this.$store.state.items.filters;
    }
  },
  filters: {
    upperFirstChar(val) {
      return val[0].toUpperCase() + val.substring(1);
    }
  },
  async fetch({ store }) {
    store.commit('CLEAR_ITEMS_FILTERS');
    await store.dispatch('getItems');
  },
  head() {
    return {
      title: 'Fortnight.gg - Items explorer'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/index.scss";

.sort-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

select {
  font-family: $ff;
  color: #fff;
  background-color: #373971;
  border: none;
  height: 42px;
  width: 130px;
  border-radius: 6px;
  padding: 0 5px;
  margin-right: 5px;
}

h3 {
  font-size: 13px;
  margin: 0 0 5px 0;
}

.items-page-wrapper {
  margin-top: 300px;
  display: flex;
  min-height: 80vh;
  @include tablet {
    flex-direction: column;
  }
}

.items-nav {
  flex: 2;
  @include tablet {
    flex: 0;
  }
}

.list-enter, .list-leave-to {
  transform: scale(0) rotate(-30deg);
  opacity: 0;
  flex: 0 0 auto;
}
.list-leave-active {
  position: absolute;
}

.list-move {
  position: absolute;
}

@keyframes popIn {
  0% {
    transform: scale(0);
  }
  80% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.items-filters-container {
  flex: 9;
  margin-left: 40px;
  min-height: 70vh;
  @include tablet {
    margin: 20px 0 0 0;
  }
}

.items-wrapper {
  display: flex;
  flex: 9;
  padding: 20px;
  box-sizing: border-box;
  align-content: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  @include tablet {
    margin-left: 0;
    margin-bottom: 70px;
  }
}

.filters-fail {
  margin-top: 50px;
  // box-sizing: border-box;
  text-align: center;
}
</style>


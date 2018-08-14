<template>
  <article>

    <header>
      <h1>Items explorer</h1>
    </header>

    <section class="items-root-wrapper">
      <items-nav
        class="items-nav"
        :itemsTypes="itemsTypes"
        :filters="filters"
      />
      <div class="items-filters-container">
        <!-- <items-filters :filters="filters"/> -->
        <nav>
          <h2>SORT BY:</h2>
          <div class="sort-wrapper">
            <fg-list
              :options="sortCategories"
              @selected="SORT_ITEMS_BY($event)"
            />
            <checkbox-arrow
              :value="sortOptions.desc"
              @checkboxClick="SORT_ITEMS_DIRECTION"
            />
          </div>
        </nav>

        <transition-group name="item" tag="ul" class="items-wrapper">
          <item
            v-for="item in filteredItems"
            :key="item.id"
            :item="item"
            @click.native="choosenItem = item.id"
          />
        </transition-group>
        <div v-show="!filteredItems.length" class="filters-fail">
          <p>No items were found for your filters</p>
          <button @click="CLEAR_ITEMS_FILTERS">Clear filters</button>
        </div>
      </div>

      <article class="details-wrapper"
        @click.self="choosenItem = null"
        v-show="choosenItem"
      >
        <item-details
          v-for="item in items"
          v-show="item.id === choosenItem"
          :key="item.id"
          :item="item"
          @closeDetails="choosenItem = null"
        />
      </article>

    </section>
  </article>
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
      choosenItem: null,
      sortCategories: [
        { text: 'Name', value: 'name' },
        { text: 'Damage', value: 'damage' },
        { text: 'Rarity', value: 'rarity' },
        { text: 'Magazine size', value: 'magSize' },
        { text: 'Headshot', value: 'headshot' },
        { text: 'DPS', value: 'dps' }
      ]
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
      'filteredTypes'
    ]),
    itemsState() {
      return this.$store.state.items;
    },
    items() {
      return this.itemsState.items;
    },
    itemsTypes() {
      return this.itemsState.itemsTypes;
    },
    sortOptions() {
      return this.itemsState.sortOptions;
    },
    filters() {
      return this.itemsState.filters;
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
      title: 'Fortnite Items Explorer - Fortnight.gg'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/index.scss";
.item-move {
  transition: all 1s !important;
}

.item-enter {
  transform: scale(0);
  opacity: 0;
}

.item-leave-active {
  position: absolute !important;
  opacity: 0;
}

.container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}

.sort-wrapper {
  display: flex;
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

h2 {
  font-size: 13px;
  margin: 0 0 5px 0;
}

.items-root-wrapper {
  display: flex;
  min-height: 80vh;
  margin-top: 20px;
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
  list-style-type: none;
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
  text-align: center;
}


.details-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  max-height: 100vh;
  left: 0;
  top: 0;
  background-color: rgba(1,1,1,.4);
  z-index: 250;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>


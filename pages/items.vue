<template>
  <div class="items-page-wrapper">

    <items-nav
      class="items-nav"
      :itemsTypes="itemsTypes"
      :filters="filters"
    />



    <div class="items-filters-container">
      <items-filters :filters="filters"/>
      <transition-group tag="div" v-if="filteredItems.length" name="list" class="items-wrapper">
        <item
          v-for="(item, itemKey) in filteredItems"
          :key="itemKey"
          :item="item"
          @choosenItem="choosenItem = $event">
        </item>
      </transition-group>
      <div v-else class="filters-fail">
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

export default {
  components: {
    Item,
    ItemsNav,
    ItemsFilters,
    ItemDetails
  },
  data() {
    return {
      itemPhrase: '',
      id: 0,
      choosenItem: null
    }
  },
  methods: {
    ...mapMutations(['CLEAR_ITEMS_FILTERS'])
  },
  computed: {
    ...mapGetters([
      'filteredItems',
      'filteredTypes',
      'itemsTypes'
    ]),
    filters() {
      return this.$store.state.items.filters;
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
    min-height: 100vh;
  }
}

.filters-fail {
  margin-top: 50px;
  text-align: center;
}
</style>


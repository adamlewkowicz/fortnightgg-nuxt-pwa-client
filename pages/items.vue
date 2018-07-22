<template>
  <div class="items-page-wrapper">

    <items-nav
      class="items-nav"
      :itemsTypes="itemsTypes"
      :filters="items.filters"
    />

    <transition-group tag="div" name="list" class="items-wrapper">
      <item
        v-for="(item, itemKey) in filteredItems"
        :key="itemKey"
        :item="item">
      </item>
    </transition-group>

  </div>
</template>


<script>
import { mapGetters } from 'vuex';
import Item from '@/components/Item';
import ItemsNav from '@/components/ItemsNav';
import ItemsFilters from '@/components/ItemsFilters';

export default {
  components: {
    Item,
    ItemsNav,
    ItemsFilters
  },
  data() {
    return {
      itemPhrase: ''
    }
  },
  computed: {
    ...mapGetters([
      'filteredItems',
      'filteredTypes',
      'itemsTypes'
    ]),
    items() {
      return this.$store.state.items;
    },
    // filteredItems() {
    //   return this.items
    //     .filter(item => item.weapon_name.toLowerCase().indexOf(this.itemPhrase) !== -1)
    //     .filter(item => this.itemsTypes.some(type => item.type_name === type))
    // },
    // weaponsTypes() {
    //   return this.items
    //     .reduce((types, item) => types.some(type => type === item.type_name) ? types : [...types, item.type_name], []);
    // }
  },
  async fetch({ store }) {
    store.commit('CLEAR_ITEMS_FILTERS');
    await store.dispatch('getItems');
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

// .item-move {
//   transition: transform 1s;
// }


.list-enter, .list-leave-to {
  transform: scale(0) rotate(-30deg);
  opacity: 0;
}
.list-leave-active {
  position: absolute;
}

.list-move {
  transition: transform .3s;
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




.items-wrapper {
  display: flex;
  flex: 9;
  padding: 20px;
  // min-height: 100vh;
  // background-color: red;
  margin-left: 40px;
  box-sizing: border-box;
  align-content: flex-start;
  justify-content: center;
  // align-items: flex-start;
  flex-wrap: wrap;
  &:after {
    // content: "";
    // flex: auto;
  }
  @include tablet {
    margin-left: 0;
    min-height: 100vh;
  }
}
</style>


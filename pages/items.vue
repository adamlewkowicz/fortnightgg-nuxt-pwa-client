<template>
  <div class="items-page-wrapper">

    <items-nav
      class="items-nav"
      @filterItems="itemPhrase = $event"
      :weaponsTypes="weaponsTypes"
      @sortByType="itemsTypes = $event"
    />

      <!-- @sortByType="" -->
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
import Item from '@/components/Item';
import ItemsNav from '@/components/ItemsNav';

export default {
  components: {
    Item,
    ItemsNav
  },
  data() {
    return {
      items: [],
      itemPhrase: '',
      itemsTypes: []
    }
  },
  methods: {
    sortByType(choosenTypes) {
      this.itemsTypes = choosenTypes;
      console.log(choosenTypes)
    }
  },
  computed: {
    filteredItems() {
      return this.items
        .filter(item => item.weapon_name.toLowerCase().indexOf(this.itemPhrase) !== -1)
        .filter(item => this.itemsTypes.some(type => item.type_name === type))
    },
    weaponsTypes() {
      return this.items
        .reduce((types, item) => types.some(type => type === item.type_name) ? types : [...types, item.type_name], []);
    }
  },
  mounted() {
    this.itemsTypes = this.weaponsTypes;
  },
  async asyncData({ app }) {
    const { data: { items }} = await app.$axios.get(`/items`);
    return { items }
  }
}
</script>

<style lang="scss" scoped>
.items-page-wrapper {
  margin-top: 300px;
  display: flex;
  min-height: 80vh;
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
  justify-content: flex-start;
  // align-items: flex-start;
  flex-wrap: wrap;
  &:after {
    content: "";
    flex: auto;
    // width: 100%;
  }
}
</style>


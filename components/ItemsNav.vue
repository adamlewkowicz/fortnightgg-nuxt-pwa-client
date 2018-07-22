<template>
  <div class="items-nav">
    <label for="name-searcher">
      <h3>ITEM NAME:</h3>
    </label>
    <input type="text"
      id="name-searcher"
      v-model="itemName"
      placeholder="enter name..."
      @input="filterItems"
    />
    <h3>FILTER BY TYPE:</h3>
    <select v-model="itemsTypes"
      :size="weaponsTypes.length"
      @change="$emit('sortByType', itemsTypes)"
      multiple>
      <option v-for="(weaponType, weaponTypeKey) in weaponsTypes"
        :key="weaponTypeKey">
        {{ weaponType }}
      </option>
    </select>
    {{ itemsTypes }}
    <!-- <div v-for="(weaponType, weaponTypeKey) in weaponsTypes"
      :key="weaponTypeKey"
      class="items-types">
      <label :for="weaponType | htmlTag">
        {{ weaponType }}
      </label>
      <input type="checkbox"
        :id="weaponType | htmlTag"
        v-model="itemsTypes"
        :value="weaponType"
        @change="sortByType(weaponType)"
      />
    </div> -->
    <!-- {{ itemsTypes }} -->
  </div>
</template>

<script>
export default {
  props: ['weaponsTypes'],
  data() {
    return {
      itemName: '',
      firstSort: true,
      itemsTypes: this.weaponsTypes
    }
  },
  methods: {
    filterItems() {
      this.$emit('filterItems', this.itemName.toLowerCase())
    },
    addType(weaponType) {
      console.log(weaponType)
      console.log(this.itemsTypes)
      if (this.itemsTypes.some(type => type === weaponType)) {
        this.itemsTypes.push(weaponType);
        console.log(17827182)
      }
    },
    sortByType(newType) {
      if (this.firstSort) {
        this.firstSort = false;
        this.itemsTypes = [newType];
        this.$emit('sortByType', [newType]);
      } else {
        this.$emit('sortByType', this.itemsTypes);
      }
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
#name-searcher {
  border-style: none;
  padding: 14px 10px;
  color: #fff;
  border-radius: 6px;
  background-color: #373971;
  outline: none;
  margin-bottom: 20px;
  // border: 1px solid #373971;
  transition: box-shadow .3s ease;
  &:hover { box-shadow: 0px 0px 30px 6px rgba(18, 19, 56, .5); }
  &:focus { background-color: #363a94; }
  &::placeholder {
    color: rgba(255,255,255,.3);
  }
}

h3 {
  font-size: 12px;
  margin: 6px 0;
}

.items-types {
  user-select: none;
  padding: 4px;
  box-sizing: border-box;
  margin: 5px 0;
}
</style>



<template>
  <div class="items-nav">
    <input type="text"
      v-model="itemName"
      placeholder="item name..."
      @input="filterItems"
    />
    <div v-for="(weaponType, weaponTypeKey) in weaponsTypes"
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
    </div>
    {{ itemsTypes }}
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
.items-types {
  user-select: none;
  padding: 4px;
  box-sizing: border-box;
  margin: 5px 0;
}
</style>



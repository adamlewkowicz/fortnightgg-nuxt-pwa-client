<template>
  <div class="filters-wrapper">
    <div v-show="filters.name || filters.types.length">
      <h3>FILTERED BY:</h3>
      <div>
        <span v-show="filters.name" @click="FILTER_BY_NAME('')">
          name: <b>{{ filters.name }}</b>
        </span>
        <span v-show="filters.types.length" @click.self="CLEAR_ITEMS_TYPES_FILTERS()">
          types:
          <div v-for="type in filters.types"
            :key="type"
            @click="DELETE_ITEM_TYPE(type)">
            {{ type }}
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: ['filters'],
  methods: {
    ...mapMutations([
      'FILTER_BY_NAME',
      'CLEAR_ITEMS_TYPES_FILTERS',
      'DELETE_ITEM_TYPE'
    ])
  }
}
</script>

<style lang="scss" scoped>
.filters-wrapper {
  margin-bottom: 30px;
}

h3 {
  font-size: 12px;
  margin-bottom: 15px;
}

p {
  color: #b2b2d5;
}

span  {
  margin: 10px;
  &:first-child {
    margin-left: 0px;
  }
  background-color: #373971;
  border-radius: 12px;
  padding: 8px 35px 8px 10px;
  color: #b2b2d5;
  position: relative;
  b {
    color: #fff;
  }
  &:after {
    content: "\00d7";
    color: #fff;
    position: absolute;
    font-size: 18px;
    right: 12px;
    top: calc(50% - 12px);
  }
  &:hover {
    cursor: pointer;
    &:first-child {
      background-color: #4b4e8f;
    }
  }
}

span div {
  display: inline-block;
  color: #fff;
  margin-left: 15px;
  &:first-child {
    margin-left: 10px;
  }
  &:hover {
    background-color: #4b4e8f;
  }
}

</style>


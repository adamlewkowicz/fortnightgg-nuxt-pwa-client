<template>
  <div>
    <!-- <select>
      <option v-for="(sort, sortKey) in sortTypes"
        :key="sortKey">
        {{ sort }}
      </option>
    </select> -->
    <p>Filter by:</p>

    <div>
      <span v-if="filters.name" @click="FILTER_BY_NAME('')">
        name: <b>{{ filters.name }}</b>
      </span>
      <span v-if="filters.types.length">
        types:
        <div v-for="(type, typeKey) in filters.types" :key="typeKey">
          {{ type }}
        </div>
      </span>
      {{ filters }}
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: ['filters'],
  data() {
    return {
      sortTypes: ['name', 'rarity', 'damage', 'magazine_size', 'dps', 'headshot']
    }
  },
  methods: {
    ...mapMutations(['FILTER_BY_NAME'])
  }
}
</script>

<style lang="scss" scoped>
span  {
  margin: 10px;
  background-color: #373971;
  border-radius: 12px;
  padding: 8px 35px 8px 10px;
  color: rgba(255,255,255,.3);
  position: relative;
  b {
    color: rgba(255,255,255,.6);
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
    background-color: #4b4e8f;
    cursor: pointer;
  }
}

span div {
  display: inline-block;
}

</style>


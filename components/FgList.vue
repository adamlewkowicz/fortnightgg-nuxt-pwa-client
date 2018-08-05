<template>
  <select @change="$emit('selected', $event.target.value)">
    <option v-for="option in options"
      :key="option.value"
      :value="option.value">
      {{ option.text }}
    </option>
  </select>
</template>

<script>
export default {
  props: ['options']
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/index.scss";

select {
  border-style: none;
  box-shadow: 0px 0px 40px 6px rgba(28, 30, 83, 0.8);
  background: linear-gradient(to right, rgba(26, 161, 235, .2), transparent);
  background-color: #373971;
  color: #fff;
  border-radius: 6px;
  height: 42px;
  padding: 0 8px;
  min-width: 160px;
  font-family: $ff;
}

option {
  color: #b2b2d5;
  height: 40px;
  &:hover {
    color: #fff;
  }
}
</style>


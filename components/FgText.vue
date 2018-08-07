<template>
  <input type="text"
    :value="value"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  name: 'FgText',
  props: ['value']
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/index.scss";

input {
  border-style: none;
  background: linear-gradient(to left, #373971, #324f89);
  min-height: 42px;
  width: 100%;
  border-radius: 6px;
  color: #fff;
  font-family: $ff;
  box-shadow: 0px 0px 40px 6px rgba(28, 30, 83, .8);
  box-sizing: border-box;
  padding: 10px;
  transition: all .3s ease;
  &:hover, &:focus {
    background: linear-gradient(to left, #434688, #496cb1);
  }
  &::placeholder {
    color: #b2b2d5;
  }
}
</style>



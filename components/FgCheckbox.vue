<template>
  <input type="checkbox" @change="$emit('change', $event.target.value)"/>
</template>

<style lang="scss" scoped>
input[type=checkbox] {
  position: relative;
  visibility: hidden;
  &:after {
    content: "";
    color: #fff;
    text-align: center;
    background-color: #444798;
    background-color: #7173b0;
    position: absolute;
    width: 15px;
    height: 15px;
    vertical-align: middle;
    border-radius: 7px;
    z-index: 5;
    transition: background-color .3s ease;
    visibility: visible;
    font-size: 12px;
    border: 1px solid transparent;
  }
  &:hover {
    &:after {
      background-color: #334D86;
    }
  }
  &:checked {
    &:after {
      content: "\2714";
      box-shadow: 0 0 15px rgba(53,60,255,0.7);
      background-color: #334D86;
      border-color: rgba(255,255,255,.05);
    }
  }
}
</style>


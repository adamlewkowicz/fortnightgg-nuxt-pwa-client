<template>
  <span>
    <input type="checkbox"
      :id="id"
      :value="value"
      @change="$emit('checkboxClick')"
    />
    <label :for="id"></label>
  </span>
</template>

<script>
export default {
  name: 'ArrowCheckbox',
  props: ['value'],
  data() {
    return {
      active: false,
      id: ''
    }
  },
  mounted() {
    this.id = 'checkbox-' + this._uid;
  }
}
</script>

<style lang="scss" scoped>
input[type=checkbox] {
  position: absolute;
  visibility: hidden;
}

label {
  background: url(../assets/img/icons/arrow-tail.svg) no-repeat center;
  transition: transform .3s ease;
  transform: rotate(90deg);
  background-size: 20px;
  display: inline-block;
  border-style: none;
  margin: 0;
  width: 42px;
  height: 42px;
  &:hover {
    cursor: pointer;
  }
}

input[type=checkbox]:checked + label {
  transform: rotate(270deg);
}
</style>



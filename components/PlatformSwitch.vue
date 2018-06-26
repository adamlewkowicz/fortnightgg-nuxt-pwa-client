<template>
  <div>
    <button :class="{ active: active == 'pc' }" @click="changePlatform('pc')">PC</button>
    <button :class="{ active: active == 'ps4' }" @click="changePlatform('ps4')">PS4</button>
    <button :class="{ active: active == 'xb1' }" @click="changePlatform('xb1')">XB1</button>
  </div>
</template>

<script>
export default {
  props: ['active'],
  methods: {
    changePlatform(name) {
      this.$emit('switchPlatform', name);
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  background-color: #23243b;
  border-style: none;
  font-size: 13px;
  font-weight: 800;
  padding: 14px;
  margin-bottom: 20px;
  width: 70px;
  color: #4b4d71;
  outline: none;
  &:hover {
    cursor: pointer;
  }
  &:first-child {
    border-radius: 30px 0 0 30px;
  }
  &:last-child {
    border-radius: 0 30px 30px 0;
  }

}

.active {
  color: #fff;
  border-radius: 0;
  background: linear-gradient(to right, #32a0dd, #5944d7);
}
</style>


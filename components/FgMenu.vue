<template>
  <ul>
    <li v-for="link in links" :key="link.value">
      <a href="#"
        :class="{ 'active' : active === link.value  }"
        @click.prevent="$emit('clicked', link.value)">
        {{ link.text }}
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'FgSwitch',
  props: ['links', 'active']
}
</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
  display: flex;
  margin: 0;
  padding: 0;
  a {
    text-align: center;
    padding: 15px;
    box-sizing: border-box;
    display: block;
    color: #b2b2d5;
    text-decoration: none;
    min-width: 55px;
    min-height: 55px;
    border-bottom: 3px solid transparent;
    position: relative;
    &:hover {
      background: linear-gradient(to top, rgba(255,255,255,.1), transparent);
    }
  }
}

.active {
  color: #fff;
  &:after {
    content: "";
    position: absolute;
    height: 3px;
    background-color: #1aa1eb;
    box-shadow: 0 -2px 15px 0 rgb(26, 161, 235);
    width: 100%;
    bottom: 0px;
    left: 0;
  }
}
</style>


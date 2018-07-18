<template>
  <div>
    <button v-for="button in platformButtons"
      :key="button.name"
      :class="button.class"
      @click="changePlatform(button.name)">
      {{ button.text }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: String
    },
    availablePlatforms: {
      type: Array
    }
  },
  data() {
    return {
      platforms: ['pc', 'ps4', 'xb1']
    }
  },
  computed: {
    platformButtons() {
      return this.platforms.map(platform => ({
          name: platform,
          text: platform.toUpperCase(),
          class: {
            active: this.active === platform,
            disabled: !this.availablePlatforms.some(avPlatform => avPlatform === platform)
          }
        })
      );
    }
  },
  methods: {
    changePlatform(name) {
      this.$emit('switchPlatform', name);
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  user-select: none;
  background-color: #23243b;
  border-style: none;
  font-size: 13px;
  font-weight: 800;
  padding: 14px;
  margin-bottom: 20px;
  width: 70px;
  outline: none;
  color: #fff;
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
  border-radius: 0;
  background: linear-gradient(to right, #32a0dd, #5944d7);
}

.disabled {
  cursor: not-allowed;
  pointer-events: none;
  color: #4b4d71;
}
</style>


<template>
  <div>
    <platform-switch @switchPlatform="pickedPlatform=$event" :active="pickedPlatform"/>
    <div v-for="(mode, modeKey) in filteredStats" :key="modeKey" class="all-stats">
      <p v-for="(prop, propKey) in mode" :key="propKey">
        <b>{{ propKey }}</b> {{ prop }}
      </p>
     </div>

  </div>
</template>

<script>
import PlatformSwitch from "~/components/PlatformSwitch";

export default {
  components: {
    PlatformSwitch
  },
  props: ['stats'],
  data() {
    return {
      pickedPlatform: ''
    }
  },
  computed: {
    filteredStats() {
      return this.stats[this.pickedPlatform];
    }
  },
  mounted() {
    if (this.stats.hasOwnProperty('pc')) this.pickedPlatform = 'pc';
    else this.pickedPlatform = Object.keys(this.stats)[0] || '';
  }
}
</script>

<style lang="scss" scoped>
.all-stats {
  background-color: #23243b;
  padding: 30px;
  box-sizing: border-box;
  margin-bottom: 30px;
  b {
    font-weight: 300;
    color: #4b4d71;
  }
}
p {
  margin: 4px;
}
</style>



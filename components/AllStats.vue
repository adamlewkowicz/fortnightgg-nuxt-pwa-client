<template>
  <div>
    <platform-switch
      :availablePlatforms="availablePlatforms"
      @switchPlatform="pickedPlatform=$event"
      :active="pickedPlatform"
    />


    <div v-if="!filteredStats.length">
      No stats for choosen platform
    </div>
    <template v-else v-for="(stats, statsKey) in filteredStats">
      {{ stats.mode }}
      <div :key="statsKey" class="all-stats">
        <p v-for="(statProp, statPropKey) in stats" :key="statPropKey">
          {{ statPropKey}} : {{ statProp }}
        </p>
      </div>
    </template>


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
      return this.stats
        .filter(stat => stat.platform == this.pickedPlatform);
    },
    availablePlatforms() {
      return this.stats
        .reduce((platforms, stat) => {
          if (!platforms.some(platform => platform == stat.platform)) {
            return [...platforms, stat.platform];
          }
          return platforms;
        }, []);
    }
  },
  mounted() {
    if (this.stats.some(stat => stat.platform === 'pc')) this.pickedPlatform = 'pc';
    else this.pickedPlatform = this.stats[0].platform;
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



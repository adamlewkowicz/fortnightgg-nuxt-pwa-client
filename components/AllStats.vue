<template>
  <div class="wrapper">
    <platform-switch
      :availablePlatforms="availablePlatforms"
      @switchPlatform="pickedPlatform=$event"
      :active="pickedPlatform"
    />

    <template v-for="(stats, statsKey) in filteredStats">
      <h3 :key="stats.mode">{{ stats.mode.toUpperCase() }}</h3>
      <div :key="statsKey" class="all-stats">
        <p v-for="(statProp, statPropKey) in orderedStatsProps" :key="statPropKey">
          <i>{{ statProp | upperCaseFirstChar }}:</i>
          {{ stats[statProp] }}
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
      pickedPlatform: '',
      orderedStatsProps: [
        'matchesplayed', 'kills', 'score', 'hoursplayed', 'top1', 'top3', 'top6', 'top10', 'top25'
      ]
    }
  },
  computed: {
    filteredStats() {
      return this.stats
        .map(stat => ({ ...stat, hoursplayed: Math.floor(stat.minutesplayed / 60) }))
        .filter(stat => stat.platform == this.pickedPlatform)
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
  filters: {
    upperCaseFirstChar(string) {
      return string[0].toUpperCase() + string.substring(1);
    }
  },
  mounted() {
    if (this.stats.some(stat => stat.platform === 'pc')) this.pickedPlatform = 'pc';
    else this.pickedPlatform = this.stats[0].platform;
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/index.scss";

.all-stats {
  background-color: #23243b;
  padding: 30px;
  box-sizing: border-box;
  margin-bottom: 30px;
  i {
    font-style: normal;
    color: rgba(255,255,255,0.2);
    color: #4b4d71;
    // color: #525372;
  }
}

h3 {
  margin: 20px 0 5px 5px;
}

p {
  margin: 4px;
}
</style>



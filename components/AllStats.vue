<template>
  <div class="wrapper">
    <platform-switch
      :availablePlatforms="availablePlatforms"
      @switchPlatform="pickedPlatform=$event"
      :active="pickedPlatform"
    />

    <transition-group name="fade">
      <div v-for="(stats, statsKey) in filteredStats" :key="statsKey">
        <h3>{{ stats.mode.toUpperCase() }}</h3>
        <div class="all-stats">
          <div v-for="(statProp, statPropKey) in orderedStatsProps" :key="statPropKey">
            <b>{{ stats[statProp.name] }}</b>
            <p>{{ statProp.title }}</p>
          </div>
        </div>
      </div>
    </transition-group>

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
        { name: 'matchesplayed', title: 'Matches' },
        { name: 'kills', title: 'Kills' },
        { name: 'score', title: 'Score' },
        { name: 'top1', title: 'Wins' },
        { name: 'winratio', title: 'Winratio' },
        { name: 'kdratio', title: 'K/D ratio' },
        { name: 'scorepermatch', title: 'Score / Match' },
        { name: 'killspermatch', title: 'Kills / Match' },
        { name: 'top3', title: 'Top 3' },
        { name: 'top6', title: 'Top 6' },
        { name: 'top10', title: 'Top 10' },
        { name: 'top25', title: 'Top 25' }
      ]
    }
  },
  computed: {
    filteredStats() {
      return this.stats
        .map(stats => ({ ...stats, hoursplayed: Math.floor(stats.minutesplayed / 60) }))
        .filter(stats => stats.platform == this.pickedPlatform)
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
    },
    addCommasToValue(val) {
      return val
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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  div {
    font-size: 24px;
    width: 25%;
    &:not(:nth-child(n+9)) {
      margin-bottom: 20px;
    }
  }
  p {
    color: #b2b2d5;
    margin: 3px 0 0 0;
    font-size: 12px;
  }
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



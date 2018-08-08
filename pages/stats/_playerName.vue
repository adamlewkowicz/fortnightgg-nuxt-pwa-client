<template>
  <article class="stats-wrapper">

    <player-searcher
      v-if="!showStats"
      :error="error"
    />

    <section v-else>
      <header>
        <h1>{{ stats.general.name }}</h1>
      </header>
      <article id="stats">
        <div id="general-stats">
          <general-stats :stats="stats.general" :isUpdating="stats.isUpdating" :actualTime="actualTime"/>
          <stats-history v-if="stats.history.length" :history="stats.history" :live="stats.live"/>
          <p v-else class="track-message">Keep this page open to track your progress</p>
        </div>

        <div id="all-stats">
          <section v-if="stats.history.length > 1" class="chart-wrapper">
            <line-chart
              :chartData="lineChartData"
              :height="chartHeight"
            />
          </section>
          <all-stats :stats="stats.all"/>
        </div>
      </article>
    </section>

  </article>
</template>

<script>
import { mapActions } from 'vuex';
import moment from 'moment';
import axios from 'axios';
import TheGeneralStats from "~/components/TheGeneralStats";
import StatsHistory from "~/components/StatsHistory";
import AllStats from "~/components/AllStats";
import PlayerSearcher from "~/components/PlayerSearcher";
import LineChart from '~/components/LineChart';

export default {
  watchQuery: ['playerName'],
  scrollToTop: true,
  components: {
    'general-stats': TheGeneralStats,
    StatsHistory,
    AllStats,
    PlayerSearcher,
    LineChart
  },
  data () {
    return {
      chartHeight: 150,
      chartPropName: 'kills',
      actualTime: null
    }
  },
  methods: {
    ...mapActions(['updateStats']),
    timer() {
      setInterval(() => this.actualTime = moment(), 1000);
    },
  },
  computed: {
    stats() {
      return this.$store.state.stats
    },
    showStats() {
      const { playerName } = this.$route.params;
      const { name } = this.stats.general;
      if (!playerName) return false;
      else if (!this.stats.all.length) return false;
      else if (name && playerName.toLowerCase() !== name.toLowerCase()) return false;
      else return true;
    },
    error() {
      const { playerName } = this.$route.params;
      return playerName ? `No stats were found for ${playerName}` : ``;
    },
    isUpdating() {
      return this.$store.state.stats.isUpdating;
    },
    lineChartData() {
      const { history } = this.stats;
      const historyStats = [...history].reverse();
      const dates = historyStats.map(record => moment(record.datedOn).format('DD-MM'));
      const data = historyStats.map(record => record[this.chartPropName]);
      return {
        labels: dates,
        datasets: [{
          borderColor: '#359add',
          backgroundColor: 'rgba(176, 223, 255, .1)',
          label: this.chartPropName,
          data
        }]
      }
    }
  },
  async fetch({ store, params }) {
    const { playerName } = params;
    if (playerName) {
      store.commit('CHANGE_PLAYERNAME', playerName);
      await store.dispatch('getStats', playerName);
    }
  },
  head() {
    const { playerName } = this.$route.params;
    const title = playerName ? ` - ${playerName}` : '';
    return {
      title: `Fortnight.gg - Stats${title}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/index.scss";

.chart-wrapper {
  min-height: 235px;
  overflow: hidden;
  width: 100%;
  margin-bottom: 30px;
}

.track-message {
  text-align: center;
  color: $colorRose;
}

h2 {
  font-size: 13px;
}

.modes {
  background-color: #23243b;
  margin-bottom: 50px;
  padding: 40px;
  box-sizing: border-box;
}

#stats {
  display: flex;
  @include tablet2 {
    flex-direction: column;
  }
}

#general-stats {
  flex: 3.5;
  max-width: 300px;
  @include tablet {
    max-width: 100%;
  }
  flex-basis: 30px;
  margin-right: 70px;
  @include tablet2 {
    margin: 0 0 40px 0;
  }
}

#all-stats {
  flex: 9;
  margin-top: 55px;
  div {
    border-radius: 10px;
  }
  @include tablet {
    margin-top: 20px;
  }
}

section {
  margin-bottom: 60px;
}
</style>

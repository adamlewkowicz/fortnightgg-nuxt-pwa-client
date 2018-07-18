<template>
  <section>
    <h1>{{ stats.name }}</h1>
    <p>Last update: {{ updatedAt.format('YYYY-MM-DD hh:mm:ss') }}</p>
      {{ nextUpdateComesIn }}
      <p>Next update in: {{ nextUpdateComesInText }}</p>
    <button @click="updateStats($route.params.playerName)">Update</button>
    <h2>GENERAL STATS:</h2>
    {{ updateCalled }}

  <br>
    {{ isUpdating }}

    <table class="general-stats">
      <tbody>
        <tr>
          <td class="sword">Matches:</td>
          <td>{{ stats.matchesplayed }}</td>
        </tr>
        <tr class="gradi">
          <td class="clock">Hours:</td>
          <td>{{ parseInt(stats.minutesplayed/60) }}</td>
        </tr>
        <tr class="gradi2">
          <td class="sword">K/D ratio:</td>
          <td>{{ parseInt(stats.kdratio) }}</td>
        </tr>
        <tr class="gradi3">
          <td class="sword">Winratio:</td>
          <td>{{ Math.round(stats.winratio * 100) / 100}}%</td>
        </tr>
        <tr>
          <td class="sword">Kills:</td>
          <td>{{ stats.kills }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';

export default {
  props: ['stats', 'isUpdating'],
  data() {
    return {
      timer: 0,
      actualTime: moment(),
      nextUpdateAt: moment(this.updatedAt).add(3, 'minutes'),
      timeDiff: null,
      actualMoment: moment(),
      timeout: null,
      updateCalled: false
    }
  },
  methods: {
    updateTimer() {
      const { seconds } = this.nextUpdateComesIn;
      if (seconds != null && seconds < 5 && !this.isUpdating) {
        this.updateStats();
      }
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.actualMoment = moment();
        this.updateTimer();
      }, 1000)
    },
    async updateStats() {
      await this.$store.dispatch('updateStats', this.$route.params.playerName);
    }
  },
  computed: {
    updatedAt() {
      return moment(this.stats.updatedAt);
    },
    nextUpdateIn() {
      return Math.floor(moment(this.actualMoment).diff(this.updatedAt) / 1000);
    },
    nextUpdateInText() {
      return moment(this.updatedAt).add(178, 'seconds')
    },
    nextUpdateComesIn() {
      const seconds = Math.floor(moment(this.actualMoment).diff(this.nextUpdateInText) / 1000) * -1;
      const minutes = Math.floor(seconds / 60);
      const secondsInMins = seconds - minutes * 60;
      return {
        seconds,
        minutes,
        secondsInMins
      }
    },
    nextUpdateComesInText() {
      const { seconds, minutes, secondsInMins } = this.nextUpdateComesIn;
      if (seconds < 0) {
        return 'Just now';
      } else if (minutes > 0) {
        return `${minutes} minutes and ${secondsInMins} seconds`;
      } else {
        return `${secondsInMins} seconds`;
      }
    },
    lastUpdateTime() {
      return moment(this.updatedAt).fromNow();
    },
    updateFormatted() {
      return this.updatedAt.format('YYYY-MM-DD hh:mm:ss')
    }
  },
  mounted() {
    clearTimeout(this.timeout);
    this.updateTimer();
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/index.scss";

h1 {
  font-size: 40px;
  margin: 20px 0;
}
.general-stats {
  width: 100%;
  font-size: 15px;
  min-width: 230px;
  border-collapse: collapse;
  margin-bottom: 40px;
  tr {
    margin: 30px;
    &:not(:last-child) {
      td { border-bottom: 1px solid #2c2e4e; }
    }
    td {
      padding: 22px;
    }
    td:first-child {
      background-repeat: no-repeat;
      background-position: 15px 25.5px;
      padding-left: 60px;
      padding-right: 0;
      width: calc(40% - 60px);
      @include tablet2 {
        padding-left: 100px;
        background-position-x: 25px;
      }
      @include small {
        padding-left: 60px;
        background-position-x: 15px;
      }
    }
    td:last-child {
      font-weight: bold;
      padding-left: 0;
    }
  }
}
.sword { background-image: url("~/assets/img/icons/sword-ico.png"); }
.clock { background-image: url("~/assets/img/icons/clock-ico.png"); }
</style>

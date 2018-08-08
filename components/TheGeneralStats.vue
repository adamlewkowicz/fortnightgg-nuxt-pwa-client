<template>
  <section>
    <!-- <p>Last update: {{ updatedAt.format('YYYY-MM-DD hh:mm:ss') }}</p> -->
    <!-- <button @click="updateStats()">Update</button> -->

    <p class="next-update">Next update in: {{ nextUpdateIn }}</p>
    <header>
      <h2>GENERAL STATS:</h2>
    </header>

    <table class="general-stats">
      <tbody>
        <tr>
          <td class="sword">Matches:</td>
          <td>{{ stats.matchesplayed }}</td>
        </tr>
        <tr class="gradi">
          <td class="clock">{{ timePlayed.text }}:</td>
          <td>{{ timePlayed.time }}</td>
        </tr>
        <tr class="gradi2">
          <td class="sword">K/D ratio:</td>
          <td>{{ stats.kdratio }}</td>
        </tr>
        <tr class="gradi3">
          <td class="sword">Winratio:</td>
          <td>{{ stats.winratio }}%</td>
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
export default {
  props: ['stats', 'isUpdating'],
  data() {
    return {
      timer: 0,
      timeout: null
    }
  },
  methods: {
    updateTimer() {
      if (this.timer < 1 && !this.isUpdating) {
        this.updateStats();
      }
      clearTimeout(this.timeout);
      this.timeout = setInterval(() => {
        this.timer--;
        this.updateTimer();
      }, 1000);
    },
    async updateStats() {
      this.timer = 180;
      await this.$store.dispatch('updateStats', this.$route.params.playerName);
    }
  },
  computed: {
    nextUpdateIn() {
      const seconds = this.timer;
      const minutes = Math.floor(seconds / 60);
      const secondsInMins = seconds - minutes * 60;

      if (seconds < 1) {
        return 'Just now';
      } else if (minutes > 0) {
        return `${minutes} min. and ${secondsInMins} sec.`;
      } else {
        return `${secondsInMins} seconds`;
      }
    },
    timePlayed() {
      const { minutesplayed } = this.stats;
      return minutesplayed < 60 ? { text: 'Minutes', time: minutesplayed } : { text: 'Hours', time: Math.floor(minutesplayed/60) }
    }
  },
  mounted() {
    this.updateTimer();
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/index.scss";

.next-update {
  font-size: 12px;
  color: #b2b2d5;
  margin-bottom: 20px;
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

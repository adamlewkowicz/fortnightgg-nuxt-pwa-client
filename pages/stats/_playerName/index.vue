<template>
  <article>

    <div v-if="error">
      {{ error }}
    </div>

    <section v-else id="stats">
      <article id="general-stats">
        <p v-if="isUpdating">Updating stats...</p>
        <general-stats :stats="stats.general" :updatedAt="nextUpdateIn"/>
        <stats-history :stats="stats.history"/>
      </article>



      <article id="all-stats">
        <all-stats :stats="stats.all"/>
      </article>

    </section>

  </article>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
import TheGeneralStats from "~/components/TheGeneralStats";
import StatsHistory from "~/components/StatsHistory";
import AllStats from "~/components/AllStats";

export default {
  components: {
    'general-stats': TheGeneralStats,
    StatsHistory,
    AllStats
},
  data () {
    return {
      stats: {},
      error: '',
      isUpdating: false,
      updateTime: null,
      updateTimer: 180
    }
  },
  methods: {
    timer() {
      setInterval(() => this.updateTimer++, 1000);
    }
  },
  computed: {
    updatedAt() {
      return moment(this.stats.general.updatedAt).format('YYYY-MM-DD HH:mm:ss');
    },
    nextUpdateIn() {
      if (this.updateTimer > 120) {
        return `2 min ${this.updateTimer-120} sec`
      } else if (this.updateTimer > 60) {
        return `1 min ${this.updateTimer-60} sec`
      } else {
        return `${this.updateTimer} sec`
      }

    }
  },
  watch: {
    'this.updateTimer' (val) {
      console.log(val)
    }
  },
  async created() {
    setInterval(() => this.updateTimer--, 1000);
    // const timestamp = Date.now();
    // this.isUpdating = true;
    // const { data: updatedStats } = await axios.post(`http://localhost:4000/stats/${this.$route.params.playerName}`);
    // this.isUpdating = false;
    // this.updateTime = Date.now() - timestamp;
    // this.stats = updatedStats.stats;
  },
  async asyncData({ app, params }) {
    const { data } = await axios.get(`http://localhost:4000/stats/${params.playerName}`)
    return data;
  }
}
</script>

<style lang="scss">
@import "@/assets/css/index.scss";

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
  margin-top: 120px;
  display: flex;
  @include tablet2 {
    flex-direction: column;
  }
}

#general-stats {
  flex: 3.5;
  flex-basis: 30px;
  margin-right: 70px;
  @include tablet2 {
    margin: 0 0 40px 0;
  }
}

#all-stats {
  flex: 9;
  div {
    border-radius: 10px;
  }
}
</style>

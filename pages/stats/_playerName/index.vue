<template>
  <article>

    <div v-if="error">
      {{ error }}
    </div>

    <section v-else id="stats">
      <article id="general-stats">
        updated in: {{ updateTime }} ms
        <p v-if="isUpdating">Updating stats...</p>
        <p v-else>No action</p>
        <general-stats :stats="stats.general" :updatedAt="updatedAt"/>
      </article>

      <article id="all-stats">
        <div v-for="(platform, platformKey) in stats.all" :key="platformKey">
          {{ platformKey}}
          <div v-for="(mode, modeKey) in platform" :key="modeKey" class="modes">
            {{ modeKey }}
            <p v-for="(prop, propKey) in mode" :key="propKey">
              {{ propKey }} : {{ prop }}
            </p>
          </div>
        </div>
      </article>
    </section>

  </article>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
import TheGeneralStats from "~/components/TheGeneralStats";

export default {
  components: {
    'general-stats': TheGeneralStats
  },
  data () {
    return {
      stats: {},
      error: '',
      isUpdating: false,
      updateTime: null
    }
  },
  computed: {
    updatedAt() {
      return moment(this.stats.general.updatedAt).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  async created() {
    const timestamp = Date.now();
    this.isUpdating = true;
    const { data: updatedStats } = await axios.post(`http://localhost:4000/stats/${this.$route.params.playerName}`);
    this.isUpdating = false;
    this.updateTime = Date.now() - timestamp;
    this.stats = updatedStats.stats;
  },
  async asyncData({ app, params }) {
    try {
      const { playerName } = params;
      const { data: general } = await axios.get(`http://localhost:4000/stats/general/${playerName}`);
      if (!Object.keys(general).length) {
        const { data: stats } = await axios.post(`http://localhost:4000/stats/${playerName}`);
        return stats;
      }
      const { data: all } = await axios.get(`http://localhost:4000/stats/all/${playerName}`);
      return {
        stats: {
          general,
          all
        }
      }
    } catch(err) {
      console.log(err)
      return { error: err.response.data.msg || "Lol" }
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/index.scss";

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
  flex: 4;
  flex-basis: 30px;
  margin-right: 70px;
  @include tablet2 {
    margin: 0 0 40px 0;
  }
}

#all-stats {
  flex: 9;
}
</style>

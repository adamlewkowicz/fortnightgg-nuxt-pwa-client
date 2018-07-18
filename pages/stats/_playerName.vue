<template>
  <article>



    {{ showStats }}

    {{ this.$route.params.playerName }}

    <template v-if="!$route.params.playerName">
      <h3>Enter your nickname</h3>
      <input type="text" />
    </template>

    <section v-else-if="stats.all.length" id="stats">
      <article id="general-stats">
        <general-stats :stats="stats.general" :isUpdating="stats.isUpdating"/>
        <stats-history v-if="stats.history.length" :stats="stats.history"/>
      </article>


      <article id="all-stats">
        <all-stats :stats="stats.all"/>
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

export default {
  watchQuery: ['playerName'],
  components: {
    'general-stats': TheGeneralStats,
    StatsHistory,
    AllStats
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions(['updateStats'])
  },
  computed: {
    stats() {
      return this.$store.state.stats;
    },
    showStats() {
      const { playerName } = this.$route.params;
      const { name } = this.stats.general;
      if (!playerName) return false;
      else if (!this.stats.all.length) return false;
      else if (name && playerName.toLowerCase() !== name.toLowerCase()) return false;
      else return true;
    }
  },
  async fetch({ store, params }) {
    const { playerName } = params;
    if (playerName) {
      store.commit('CHANGE_PLAYERNAME', playerName);
      await store.dispatch('getStats', playerName);
    }
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

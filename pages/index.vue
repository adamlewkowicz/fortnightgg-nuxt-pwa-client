<template>
  <article>

    <player-searcher />

    <section>
      <header>
        <h2>Recently updated players</h2>
      </header>
      <article class="table-wrapper">
        <table class="players-table">
          <thead>
            <tr>
              <th>Nickname:</th>
              <th>Kills:</th>
              <th>Matches played:</th>
              <th>Updated:</th>
            </tr>
          </thead>
          <transition-group tag="tbody" name="slide-left" appear>
            <tr v-for="(record, recordKey) in normalizedRecords"
              :key="recordKey"
              :style="recordsStyle[recordKey]"
            >
              <td>
                <nuxt-link :to="`/stats/${record.name}`">{{ record.name }}</nuxt-link>
              </td>
              <td>{{ record.kills }}</td>
              <td>{{ record.matchesplayed }}</td>
              <td>{{ record.updatedAt }}</td>
            </tr>
          </transition-group>
        </table>
      </article>
    </section>


  </article>
</template>

<script>
import moment from 'moment';
import PlayerSearcher from '~/components/PlayerSearcher';
import axios from 'axios';

export default {
  components: {
    PlayerSearcher
  },
  data() {
    return {
      nickname: '',
      lastRecords: []
    }
  },
  computed: {
    recordsStyle() {
      return this.lastRecords.map((record, index) => ({
        transition: `transform 1s ease ${index/15}s, opacity 1s ease ${index/15}s`,
      }));
    },
    normalizedRecords() {
      return this.lastRecords.map((record, index) => ({
          ...record,
          updatedAt: moment(record.updatedAt).fromNow()
        })
      );
    }
  },
  async asyncData({ app }) {
    const { lastRecords } = await app.$axios.$get('/stats/last-records');
    return { lastRecords };
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/index.scss";

h2 {
  text-align: center;
  margin-top: 250px;
  margin-bottom: 40px;
  font-size: 15px;
  @include phone {
    margin-top: 100px;
  }
}

.table-wrapper {
  overflow: hidden;
  @include small {
    font-size: 12px;
  }
}

.players-table {
  max-width: 700px;
  margin: 0 auto;
}
</style>

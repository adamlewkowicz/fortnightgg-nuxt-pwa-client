<template>
  <div>

    <player-searcher />

    <h3>Recently updated players</h3>
    <div class="table-wrapper">
      <table>
        <thead>
          <th>Nickname:</th>
          <th>Kills:</th>
          <th>Matches played:</th>
        </thead>
        <transition-group tag="tbody" name="slide-left" appear>
          <tr v-for="(record, recordKey) in lastRecords"
            :key="recordKey"
            :style="recordsStyle[recordKey]"
            @click="$router.push(`/stats/${record.name}`)"
          >
            <td>{{ record.name }}</td>
            <td>{{ record.kills }}</td>
            <td>{{ record.matchesplayed }}</td>
          </tr>
        </transition-group>
      </table>
    </div>
  </div>
</template>

<script>
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
        transition: `transform 1s ease ${index/10}s, opacity 1s ease ${index/10}s`
      }));
    }
  },
  async asyncData({ app }) {
    // return new Promise((resolve) => {
    //   setTimeout(() => resolve({}), 2000);
    // });
    const { lastRecords } = await app.$axios.$get('/stats/last-records');
    return { lastRecords };
  },
  head() {
    return {
      title: 'Fortnight.gg - Homepage'
    }
  }
}
</script>

<style lang="scss" scoped>
h3 {
  text-align: center;
  margin-top: 250px;
  margin-bottom: 40px;
}

.table-wrapper {
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
  tbody {
    td {
      text-align: center;
      padding: 15px 0;
    }
    tr:hover {
      transition-delay: 0 !important;
      background-color: rgba(255,255,255,0.08);
      cursor: pointer;
    }
  }
  margin-bottom: 80px;
}
</style>

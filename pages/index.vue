<template>
  <div>

    <player-searcher />

    <h3>Recently updated players</h3>
    <table>
      <thead>
        <th>Nickname:</th>
        <th>Kills:</th>
        <th>Matches played:</th>
      </thead>
      <tbody>
        <tr v-for="(record, recordKey) in lastRecords"
          :key="recordKey"
          @click="$router.push(`/stats/${record.name}`)"
        >
          <td>{{ record.name }}</td>
          <td>{{ record.kills }}</td>
          <td>{{ record.matchesplayed }}</td>
        </tr>
      </tbody>
    </table>
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
  async asyncData({ app }) {
    // return new Promise((resolve) => {
    //   setTimeout(() => resolve({}), 2000);
    // });
    const { lastRecords } = await app.$axios.$get('/stats/last-records');
    return { lastRecords };
  }
}
</script>

<style lang="scss" scoped>
h3 {
  text-align: center;
  margin-top: 250px;
  margin-bottom: 40px;
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
      background-color: rgba(255,255,255,0.08);
      cursor: pointer;
    }
  }
  margin-bottom: 80px;
}
</style>

<template>
  <article>
    <h2>STATS HISTORY:</h2>
    <table>
      <thead>
        <tr>
          <th>Matches:</th>
          <th>Wins:</th>
          <th>Kills:</th>
          <th>Date:</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, recordKey) in formattedStats" :key="recordKey">
          <td>{{ record.matchesplayed }}</td>
          <td>{{ record.score }}</td>
          <td>{{ record.kills }}</td>
          <td>{{ record.date }}</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
import moment from "moment";

export default {
  props: ['stats'],
  computed: {
    formattedStats() {
      return this.stats.map(record => {
        const date = moment(record.date, 'YYYY-MM-DD');
        return {
          ...record,
          date: `${date.format('DD')} ${(date.format('MMMM')).substring(0,3)}`
       }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

th {
  width: 25%;
  color: #4b4d71;
  padding-bottom: 10px;
  font-weight: 400;
}

td {
  text-align: center;
  background-color: #23243b;
  padding: 12px;
  &:first-child {
    border-radius: 10px 0 0 10px;
  }
  &:last-child {
    border-radius: 0 10px 10px 0;
  }
}
</style>



<template>
  <div class="ranking-root">
    <div class="ranking-wrapper">
      <p>Platform</p>
      <select v-model="platform" @change="getRanking">
        <option value="pc">PC</option>
        <option value="ps4">PS4</option>
        <option value="xb1">XBOX One</option>
      </select>
      <p>Category</p>
      <select v-model="category" @change="getRanking">
        <option v-for="category in categories"
          :key="category.value"
          :value="category.value">
          {{ category.name }}
        </option>
      </select>
      <table>
        <thead>
          <th>RANK:</th>
          <th>PLAYER:</th>
          <th>{{ category.toUpperCase() }}</th>
          <th>GAMES:</th>
        </thead>
        <tbody>
          <tr v-for="(record, recordKey) in ranking" :key="recordKey">
            <td>{{ offset + recordKey + 1}} </td>
            <td><nuxt-link :to="`/stats/${record.player}`">{{ record.player }}</nuxt-link></td>
            <td>{{ record[category] }}</td>
            <td>{{ record.matchesplayed }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="ad-panel">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        { name: 'Wins', value: 'top1' },
        { name: 'Score', value: 'score' },
        { name: 'Kills', value: 'kills' },
        { name: 'Matches', value: 'matchesplayed' },
        { name: 'Winratio', value: 'winratio' },
        { name: 'KDratio', value: 'kdratio' },
        { name: 'Kills per match', value: 'killspermatch' },
        { name: 'Score per match', value: 'scorepermatch' },
        { name: 'Top 3', value: 'top3' },
        { name: 'Top 5', value: 'top5' },
        { name: 'Top 6', value: 'top6' },
        { name: 'Top 10', value: 'top10' },
        { name: 'Top 12', value: 'top12' },
        { name: 'Top 25', value: 'top25' }
      ],
      platform: 'pc',
      mode: 'solo',
      category: 'top1',
      season: 5,
      page: 0
    }
  },
  methods: {
    async getRanking() {
      const { platform, mode, category, season, page } = this;
      const { ranking } = await this.$axios.$get(`/stats/ranking/${platform}/${mode}/${category}/season/${season}/page/${page}`);
      this.ranking = ranking;
    }
  },
  async asyncData({ app }) {
    const { ranking, offset, category } = await app.$axios.$get(`/stats/ranking/pc/solo/top1/season/5/page/0`);
    return { ranking, offset, category };
  }
}
</script>

<style lang="scss" scoped>
.ranking-root {
 display: flex;
 margin-bottom: 100px;
}

.ranking-wrapper {
  margin-top: 200px;
  flex: 9;
}

.ad-panel {
  flex: 2;
}

th {
  text-align: left;
  padding: 10px 0;
}

table {
  width: 100%;
  border-collapse: collapse;
}

tr:nth-child(even) td {
  background-color: rgba(255,255,255,.015);
}

td {
  padding: 10px 0;
  &:first-child, &:last-child {
    padding: 10px 20px;
  }
  &:nth-child(2) {
    font-size: 16px;
  }
  &:nth-child(3), &:last-child {
    text-align: right;
  }
  a {
    color: #fff;
    text-decoration: none;
  }
}
</style>



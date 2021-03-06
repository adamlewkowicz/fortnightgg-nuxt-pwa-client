<template>
  <article class="ranking-page-wrapper">
    <p class="platform-title">{{ platform.toUpperCase() }}</p>
    <header>
      <h1>{{ categoryText }} ranking</h1>
    </header>

    <nav class="ranking-options">
      <div>
        <p>Platform</p>
        <fg-list
          :options="platforms"
          @selected="updateRankingOpts('platform', $event)"
        />
      </div>
      <div>
        <p>Category</p>
        <fg-list
          :options="categories"
          @selected="updateRankingOpts('category', $event)"
        />
      </div>
    </nav>

    <fg-menu
      :links="modes"
      :active="mode"
      class="modes-menu"
      @clicked="updateRankingOpts('mode', $event)"
    />

    <transition name="fade-slide">
      <loading-cubes v-if="isLoading"/>
      <section v-else-if="!ranking.length">
        <p>No rankings were found for your settings</p>
      </section>
      <section v-else class="ranking-table-wrapper">
        <table class="players-table">
          <thead>
            <tr>
              <th>RANK</th>
              <th>PLAYER</th>
              <th>{{ categoryText.toUpperCase() }}</th>
              <th>MATCHES</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(record, recordKey) in ranking" :key="recordKey">
              <td>{{ offset + recordKey + 1}}</td>
              <td><nuxt-link :to="`/stats/${encodeURI(record.player)}`">{{ record.player }}</nuxt-link></td>
              <td>{{ record[category] }}</td>
              <td>{{ record.matchesplayed }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </transition>

  </article>
</template>

<script>
import LoadingCubes from '@/components/LoadingCubes';

export default {
  components: { LoadingCubes },
  scrollToTop: true,
  data() {
    return {
      categories: [
        { text: 'Wins', value: 'top1' },
        { text: 'Score', value: 'score' },
        { text: 'Kills', value: 'kills' },
        { text: 'Matches', value: 'matchesplayed' },
        { text: 'Winratio', value: 'winratio' },
        { text: 'KDratio', value: 'kdratio' },
        { text: 'Kills per match', value: 'killspermatch' },
        { text: 'Score per match', value: 'scorepermatch' },
        { text: 'Top 3', value: 'top3' },
        { text: 'Top 5', value: 'top5' },
        { text: 'Top 6', value: 'top6' },
        { text: 'Top 10', value: 'top10' },
        { text: 'Top 12', value: 'top12' },
        { text: 'Top 25', value: 'top25' }
      ],
      modes: [
        { text: 'Solo', value: 'solo' },
        { text: 'Duo', value: 'duo' },
        { text: 'Squad', value: 'squad' }
      ],
      platforms: [
        { text: 'PC', value: 'pc' },
        { text: 'Playstation 4', value: 'ps4' },
        { text: 'Xbox One', value: 'xb1' }
      ],
      platform: 'pc',
      mode: 'solo',
      category: 'top1',
      season: 5,
      page: 1,
      isLoading: false
    }
  },
  methods: {
    updateRankingOpts(optionName, value) {
      if (!this.isLoading) {
        this[optionName] = value;
        this.getRanking();
      }
    },
    async getRanking() {
      this.isLoading = true;
      const { platform, mode, category, season, page } = this;
      const { ranking } = await this.$axios.$get(`/stats/ranking/${platform}/${mode}/${category}/season/${season}/page/${page}`);
      this.ranking = ranking;
      this.isLoading = false;
    }
  },
  computed: {
    categoryText() {
      return this.categories.find(category => category.value === this.category).text;
    }
  },
  async asyncData({ app }) {
    const { ranking, offset, category } = await app.$axios.$get(`/stats/ranking/pc/solo/top1/season/5/page/1`);
    return { ranking, offset, category };
  },
  head() {
    return {
      title: 'Fortnite Players Ranking - Fortnight.gg'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/index.scss";

.ranking-page-wrapper {
  max-width: 800px;
  margin: 0 auto;
  flex: 9;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  @include small {
    font-size: 12px;
  }
}

.ranking-table-wrapper {
  overflow-x: auto;
}

.players-table {
  table-layout: fixed;
}

p {
  color: $colorRose;
}

h1 {
  font-size: 40px;
  margin: 0 0 20px 0;
}

.platform-title {
  margin: 0;
  font-size: 12px;
  font-weight: bold;
  position: relative;
  top: 5px;
}

.ranking-options {
  display: flex;
  flex-wrap: wrap;
  div:first-child {
    margin-right: 35px;
  }
  margin-bottom: 30px;
}

.modes-menu {
  margin-bottom: 30px;
}

.ad-panel {
  flex: 0;
}
</style>



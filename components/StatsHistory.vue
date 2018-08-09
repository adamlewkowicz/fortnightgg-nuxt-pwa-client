<template>
  <section>
    <h2>MATCH HISTORY:
      <button :class="{ active: showLiveStats }" @click="showLiveStats = true">Live</button>
      <button :class="{ active: !showLiveStats }" @click="showLiveStats = false">Daily</button>
    </h2>

    <div class="history-components">
      <div :style="transitionStyle" class="history-comp">
        <ul>
          <li v-for="(match, matchKey) in limitedStats"
            :key="matchKey*2"
            :class="match.place.toLowerCase()">
            {{ match.place }}
            <span v-if="match.matchesplayed > 1" class="matches-played">
              {{ match.matchesplayed }} games
            </span>
            <span>{{ match.timeAgo }}</span>
          </li>
        </ul>
      </div>

      <div :style="transitionStyle" class="history-comp">
        <table>
          <thead>
            <tr>
              <th>Wins / Matches</th>
              <th>Kills:</th>
              <th>Score:</th>
              <th>Date:</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(record, recordKey) in dailyStats" :key="recordKey">
              <td>{{ record.top1 }} / {{ record.matchesplayed }}</td>
              <td>{{ record.kills }}</td>
              <td>+{{ record.score }}</td>
              <td>{{ record.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </section>
</template>

<script>
import moment from "moment";

export default {
  name: 'StatsHistory',
  props: ['history', 'live'],
  data() {
    return {
      showLiveStats: true,
      actualTime: moment(),
      style: {
        transform: "translateX(calc(-100% - 20px))"
      }
    }
  },
  computed: {
    transitionStyle() {
      return this.showLiveStats ? {} : this.style;
    },
    dailyStats() {
      return this.history.map(record => {
        const date = moment(record.datedOn)
        return {
          ...record,
          date: `${date.format('DD')} ${(date.format('MMMM')).substring(0,3)}`
       }
      });
    },
    liveStats() {
      return this.live.map(record => {
        const timeAgo = moment(record.date).from(this.actualTime)
        const getPlace = () => {
          if (record.top1) return 'Winner';
          else if (record.top10) return 'Top 10';
          else if (record.top25) return 'Top 25';
          else return 'Defeat';
        }
        return {
          ...record,
          place: getPlace(),
          timeAgo
        }
      })
    },
    limitedStats() {
      return this.liveStats.length < 8 ? this.liveStats : this.liveStats.slice(0, 8);
    }
  },
  methods: {
    updateActualTime() {
      setInterval(() => {
        this.actualTime = moment();
      }, 1000);
    }
  },
  mounted() {
    this.updateActualTime()
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/index.scss";

h2 {
  font-size: 13px;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
}

.history-components {
  display: flex;
  overflow: hidden;
}

.history-comp {
  flex-basis: 100%;
  flex-shrink: 0;
  transition: transform .3s ease;
  &:first-child {
    margin-right: 20px;
  }
}

button {
  min-width: 42px;
  min-height: 42px;
  width: 80px;
  border-style: none;
  background-color: transparent;
  color: #fff;
  border-bottom: 3px solid transparent;
  position: relative;
  &:first-child {
    margin-left: auto;
  }
  &:hover, &:focus {
    cursor: pointer;
    outline: none;
  }
  &.active {
    border-color: #1aa1eb;
  }
}


ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  border-radius: 6px;
  background-color: #23243b;
  padding: 13px;
  margin-bottom: 7px;
  display: flex;
  border: 2px solid transparent;
  transition: transform 1s;
  position: relative;
  justify-content: space-between;
  span {
    font-size: 12px;
    &.matches-played { color: $colorRose; }
  }
  &.defeat {
    border-image-slice: 1;
  }
  &.winner {
    &:before {
      content: "1";
      position: absolute;
      height: calc(100% + 4px);
      width: 50px;
      top: -2px;
      left: -2px;
      border-radius: 6px 0 0 6px;
      background: linear-gradient(120deg, #b4ec51, #429321);
      text-align: center;
      padding: 10px 0;
      box-sizing: border-box;
      color: rgba(1,1,1,.5);
      font-weight: bold;
      font-size: 20px;
    }
    padding-left: 60px;
    border-image-slice: 1;
  }
}

.match-enter, .match-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.match-leave-active, .match-enter-active {
  position: absolute;
  background-color: blue;
}


table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0px 10px
}

th {
  width: 25%;
  color: #b2b2d5;
  font-size: 13px;
  padding-bottom: 10px;
  font-weight: 400;
}

td {
  text-align: center;
  background-color: #23243b;
  padding: 16px 0;
  &:first-child {
    border-radius: 10px 0 0 10px;
  }
  &:last-child {
    border-radius: 0 10px 10px 0;
  }
}

</style>



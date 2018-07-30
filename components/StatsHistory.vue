<template>
  <article>
    <h2>MATCH HISTORY:
      <button :class="{ active: showLiveStats }" @click="showLiveStats = !showLiveStats">Live</button>
      <button :class="{ active: !showLiveStats }" @click="showLiveStats = false">Daily</button>
    </h2>

    <div class="history-components">
      <section :style="transitionStyle">
        <transition-group tag="ul" name="match">
          <li v-for="(match, matchKey) in limitedStats"
            :key="matchKey*2"
            :class="match.place.toLowerCase()"
            @click="$store.commit('ADD_LIVE_MATCH')">
            {{ match.place }}
            <div>{{ match.timeAgo }}</div>
          </li>
        </transition-group>
      </section>

      <section :style="transitionStyle">
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
      </section>
    </div>

  </article>
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
        transform: "translateX(-100%)"
      }
    }
  },
  computed: {
    transitionStyle() {
      return this.showLiveStats ? {} : this.style;
    },
    formattedStats() {
      return this.history.map(record => {
        const date = moment(record.datedOn, 'YYYY-MM-DD');
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
h2 {
  margin-bottom: 25px;
}

.history-components {
  display: flex;
  overflow: hidden;
  section {
    flex-basis: 100%;
    flex-shrink: 0;
    transition: transform .3s ease;
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
  &:hover, &:focus {
    cursor: pointer;
    outline: none;
  }
  &:first-child {
    margin-left: auto;
    &:after {
      content: "";
      background-color: #eb4d4b;
      border-radius: 9px;
      position: absolute;
      width: 9px;
      height: 9px;
      right: 6px;
      top: 50%;
      transform: translateY(-50%);
    }
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
  border: 1px solid transparent;
  transition: transform 1s;
  div {
    display: inline-block;
    margin-left: auto;
    font-size: 12px;
  }
  &.defeat {
    border-image: linear-gradient(to left, #fbc2eb, transparent);
    border-image-slice: 1;
  }
  &.winner {
    border-left-width: 5px;
    border-image: linear-gradient(to left, #d4fc79, #96e6a1);
    border-image-slice: 1;
    box-shadow: 0 0 30px 0px rgba(150, 230, 161, .1);
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
  color: #4b4d71;
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



<template>
  <div class="searcher-main-wrapper">
    <p v-if="error.length" class="error-message">
      {{ error }}
    </p>
    <div class="searcher-wrapper">
      <input type="text"
        v-model="nickname"
        placeholder="Fortnite nickname"
        @input="findPlayers()"
        @keyup.enter="redirectToStats()"
      />
      <button
        type="button"
        class="btn"
        @click="redirectToStats()">
      </button>
    </div>
    <div v-if="players.length" class="players-result">
      <ul>
        <li v-for="(player, playerKey) in players" :key="playerKey"
          @click="redirectToStats(player.name)">
          {{ player.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props:{
    error: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      nickname: '',
      players: [],
      timeout: null
    }
  },
  methods: {
    findPlayers() {
      clearTimeout(this.timeout);
      const delay = this.nickname.length === 1 ? 0 : 300;
      if (this.nickname.length > 0) {
        this.timeout = setTimeout(async () => {
          const { players } = await this.$axios.$get(`/stats/players/${this.nickname}`);
          this.players = players;
        }, delay);
      } else {
        this.players = [];
      }
    },
    redirectToStats(nickname = this.nickname) {
      if (nickname.length) {
        this.$router.push(`/stats/${nickname}`);
      }
    }
  }
}
</script>



<style lang="scss" scoped>
.nickname-title {
  font-size: 20px;
  font-weight: 200;
}

.searcher-main-wrapper {
  max-width: 700px;
  margin: 200px auto;
  margin-top: 300px;
  position: relative;
}

.searcher-wrapper {
  display: flex;
  position: relative;
}

.error-message {
  background-color: #ff4757;
  border-left: 7px solid #ff6b81;
  font-weight: normal;
  padding: 12px;
  box-sizing: border-box;
  margin-bottom: 10px;
}

input[type=text] {
  box-sizing: border-box;
  width: 100%;
  background-color: rgba(68, 71, 161, 0.6);
  outline: none;
  border-radius: 6px;
  font-size: 16px;
  border-style: none;
  color: #fff;
  padding: 25px;
  transition: background-color .2s ease;
  &::placeholder {
    color: rgba(199, 201, 255, 0.5);
  }
  &:focus, &:focus {
    background-color: rgba(63, 66, 170, 0.815);
    box-shadow: 0px 0px 40px 6px rgba(28, 30, 83, 0.5);
  }
}

button {
  position: absolute;
  right: 0;
  width: 70px;
  height: 72px;
  background: url("./../assets/img/icons/arrow.svg") no-repeat center;
  background-size: 24px;
  border-style: none;
  outline: none;
  user-select: none;
  &:hover {
    cursor: pointer;
  }
}

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
  background-color: rgb(31, 32, 56);
  li {
    display: block;
    padding: 20px;
    &:hover {
      cursor: pointer;
      background-color: rgb(41, 43, 99)
    }
  }
}

.players-result {
  width: 100%;
  position: absolute;
  box-shadow: 0px 0px 40px 6px rgba(19, 20, 37, 0.3);
  max-height: 236px;
  overflow-y: hidden;
  box-sizing: border-box;
}
</style>

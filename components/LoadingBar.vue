<template>
  <div>
    <!-- <div class="bar"
      :class="barClass"
      :style="styled">
    </div> -->
    <transition name="fade">
      <div class="spinner-wrapper" v-if="loading">
        <!-- <div v-if="playerName && !statsPath" class="playername">
          looking for..
          <h1>{{ playerName }}</h1>
        </div> -->
        <div class="spinner">
          <div class="cube1"></div>
          <div class="cube2"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      finished: false,
      width: '0',
      styled: {},
      transition: false
    }
  },
  computed: {
    barClass() {
      return {
        loading: this.loading,
        loaded: this.finished
      }
    },
    style() {
      const { loading, finished } = this;
      return {
        WebkitTransition: loading && !finished ? 'width 5s ease' : '',
        width: !loading && !finished ? '100vw' : '0'
      }
    },
    playerName() {
      return this.$route.params.playerName;
    },
    routePath() {
      return this.$route.path;
    },
    statsPath() {
      return this.routePath.includes(this.playerName) ? true : false;
    },
  },
  methods: {
    start() {
      // this.width = '0';
      this.styled = {
        width: '0'
      }
      // this.styled = { WebkitTransition: 'width 5s', width: '100vw' };
      // this.styled = { WebkitTransition: 'width 5s', width: '100vw' };
      setTimeout(() => {
        this.styled = {
          WebkitTransitionProperty: 'width',
          width: '100%',
          WebkitTransitionDuration: '5s'
        };
      }, 50);

      this.finished = false;
      this.loading = true;
    },
    finish() {
      // this.styled = {
      //   ...this.styled,
      //   WebkitTransitionDuration: '1s',
      //   width: '100vw'
      // };
      this.finished = true;
      this.loading = false;
    }
  },
  watch: {
    routePath(val) {
      // console.log(val)
      // console.log(val.path)
      // console.log(this.playerName)
    }
  }
}
</script>

<style lang="scss" scoped>
.bar {
  height: 3px;
  width: 0;
  position: absolute;
  top: 70px;
  left: -17px;
  z-index: 10;
  background-color: #1aa1eb;
  box-sizing: border-box;
  // transition: all 5s ease;
  // background: linear-gradient(to right, #1cb1ef 0%, #1aa1eb 26%, #490cbd 61%, #4d0dbf 100%);
}

.loading {
  // width: 100vw;
  // transition: all 5s ease;
}

// .loaded {
//   transition-duration: .5s;
// }


@keyframes loading {
  0% {
    width: 0;
  }
  60% {
    background-color: linear-gradient(to right, #1cb1ef 0%, #1aa1eb 26%, #490cbd 61%, #4d0dbf 100%);
  }
  100% {
    width: 100vw;
  }
}

.spinner-wrapper {
  position: fixed;
  z-index: 11;
  width: 100vw;
  height: 100vh;
  top: 0;
  display: flex;
  background-color: #1b1c2e;
  align-items: center;
  // justify-content: center;
  flex-direction: column;
  padding-top: 40vh;
}

.playername {
  text-align: center;
  h1 {
    margin: 5px 0 20px 0;
  }
}

.spinner {
  position: relative;
  width: 60px;
  height: 70px;
}


.cube1, .cube2 {
  background-color: #1aa1eb;
  width: 15px;
  height: 15px;
  animation: sk-cubemove 1.8s infinite ease-in-out;
}

.cube2 {
  animation-delay: -0.9s;
}

@-webkit-keyframes sk-cubemove {
  25% { -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5) }
  50% { -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg) }
  75% { -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5) }
  100% { -webkit-transform: rotate(-360deg) }
}

@keyframes sk-cubemove {
  25% {
    transform: translateX(42px) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  } 50% {
    transform: translateX(42px) translateY(42px) rotate(-179deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
  } 50.1% {
    transform: translateX(42px) translateY(42px) rotate(-180deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  } 75% {
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
  } 100% {
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
}
</style>

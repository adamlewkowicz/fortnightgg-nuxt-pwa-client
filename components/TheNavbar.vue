<template>
  <div id="header-wrapper">
    <header>
      <nuxt-link to="/" id="logo">
        <img src="@/assets/img/logo.svg" alt="Fortnight website logo"/>
      </nuxt-link>

      <nav>
        <ul>
          <li><nuxt-link to="/items">Items</nuxt-link></li>
          <li><nuxt-link to="/stats">Stats</nuxt-link></li>
          <li><nuxt-link to="/ranking">Ranking</nuxt-link></li>
        </ul>
      </nav>

      <div id="user_finder">
        <input type="text" v-model="nickname" placeholder="Nickname..." @keyup.enter="findUser">
        <button type="button" @click="findUser">.GG</button>
      </div>
    </header>
      <div id="stripe"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      nickname: ''
    }
  },
  methods: {
    findUser() {
      if (this.nickname != null) {
        this.$router.push(`/stats/${this.nickname}`);
        this.nickname = '';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/index.scss";

#header-wrapper {
  position: absolute;
  width: 100%;
  top: 0;
  box-sizing: border-box;
  z-index: 50;
  background-color: #1b1c2e;
  // box-shadow: 0px 0px 70px 6px rgba(28, 30, 83, 1);
}

header {
  padding-bottom: 3px;
  height: 70px;
  max-width: 1110px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  @include desktop {
    padding: 0 20px 3px 20px;
    max-width: 960px;
  }
  @include small {
    padding: 0 10px 3px 10px;
  }
}

#logo {
  display: block;
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 20px;
  user-select: none;
  outline: none;
}

#logo img {
  pointer-events: none;
  user-select: none;
  position: relative;
  top: 3px;
  @include phone {
    width: 190px;
  }
}

nav {
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-content: center;
  }
  @include phone {
    display: none;
  }
}

li {
  height: 100%;
  a {
    color: white;
    text-decoration: none;
    padding: 25px;
    height: 100%;
    &:hover {
      background-color: rgba(255,255,255,0.1);
    }
  }
}

#user_finder {
  display: flex;
  margin-left: auto;
  @include small {
    display: none;
  }
}

#user_finder input {
  max-width: 200px;
  height: 30px;
  width: 100%;
  color: white;
  border: none;
  padding: 0 15px;
  background-color: #373971;
  transition: background-color 1s ease;
  transition: box-shadow 0.3s ease;
  font-size: 14px;
  border-radius: 25px;
  outline: none;
  float: right;
  &::placeholder {
    color: rgba(199, 201, 255, 0.5);
  }
  &:hover, &:focus {
    background-color: #444798;
	  box-shadow: 0px 0px 25px -4px rgba(68,51,233,0.54);
  }
}

#user_finder button {
  text-decoration: none;
  border: none;
  background-color: transparent;
  font-family: 'Open Sans';
  font-weight: 800;
  font-size: 16px;
  color: white;
  cursor: pointer;
}

#stripe {
  height: 3px;
  background: linear-gradient(to right, #1cb1ef 0%,#1aa1eb 26%,#490cbd 61%,#4d0dbf 100%);
  display: none;
  @include phone {
    display: block;
  }
}
</style>

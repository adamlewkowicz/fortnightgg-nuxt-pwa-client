<template>
  <div>
    <the-navbar/>
    <nuxt/>
  </div>
</template>

<script>
import TheNavbar from '../components/TheNavbar';

export default {
  components: {
    TheNavbar
  }
}
</script>

<style>
html {
  font-family: "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 14px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

body {
  margin: 0;
  background-color: #1b1c2e;
  color: white;
  background-image: url("../assets/img/banner.jpg");
  background-repeat: no-repeat;
  background-position: center top 40px;
}

/* *, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
} */

</style>

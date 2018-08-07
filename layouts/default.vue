<template>
  <div>
    <the-navbar/>
    <section class="page-wrapper">
      <transition name="fade-scale">
        <nuxt/>
      </transition>
    </section>
    <phone-menu />
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar';
import PhoneMenu from '@/components/PhoneMenu';

export default {
  scrollToTop: true,
  components: {
    TheNavbar,
    PhoneMenu
  }
}
</script>

<style lang="scss">
@import "@/assets/css/index.scss";

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

.page-wrapper {
  box-sizing: border-box;
  margin: 100px auto;
  @extend %rwd-sizing;
}
</style>

<template>
  <div>
    <the-navbar/>
    <main class="page-wrapper">
      <transition name="page-transition">
        <nuxt/>
      </transition>
    </main>
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

.page-transition-enter-active, .page-transition-leave-active {
  transition: transform .7s ease, opacity .7s ease;
}

.page-transition-enter {
  position: absolute;
  transform: scale(.9);
  opacity: 0;
  @include phone {
    transform: translateY(-40px);
  }
}

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
  margin: 250px auto 100px auto;
  @extend %rwd-sizing;
  @include phone {
    margin-top: 130px;
  }
}
</style>

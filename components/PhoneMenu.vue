<template>
  <header>
    <nav>
      <ul>
        <li><nuxt-link to="/" exact title="Go to Homepage"></nuxt-link></li>
        <li><nuxt-link to="/ranking" title="Go to Ranking"></nuxt-link></li>
        <li><nuxt-link to="/items" title="Go to Items"></nuxt-link></li>
        <li><nuxt-link to="/stats" title="Go to Stats"></nuxt-link></li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@import "@/assets/css/index.scss";

header {
  position: fixed;
  z-index: 200;
  height: 70px;
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: #2a2c4b;
  display: none;
  @include phone {
    display: block;
  }
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-around;
}

$iconNames: home, trophy, gun, develop;

li {
  height: 100%;
  flex: 1;
  @for $index from 1 through 4 {
    &:nth-child(#{$index}) a {
      background-image: url('../assets/img/icons/' + nth($iconNames, $index)  +  '.svg');
    }
  }
}

a {
  display: block;
  color: #fff;
  text-decoration: none;
  transition: all .3s ease;
  height: 70px;
  // width: 100px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 24px;
  position: relative;
  @include small {
    background-size: 19px;
  }
}

.pseudo-settings {
  position: absolute;
  content: "";
  height: 70px;
  width: 100%;
}

.nuxt-link-active:after {
  @extend .pseudo-settings;
  background: linear-gradient(to top, rgba(255,255,255,.1), transparent);
  box-shadow: 0px 0px 50px 6px rgba(21, 22, 51, 0.8);
}
</style>


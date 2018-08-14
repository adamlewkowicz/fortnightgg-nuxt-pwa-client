<template>
  <header>
    <nav>
      <ul>
        <li><nuxt-link to="/dashboard/">Home</nuxt-link></li>
        <li>
          <nuxt-link to="/dashboard/articles">Articles</nuxt-link>
          <ul v-if="$route.path.includes('/dashboard/articles')">
            <li><nuxt-link to="/dashboard/articles">Home</nuxt-link></li>
            <li><nuxt-link to="/dashboard/articles/creator">Creator</nuxt-link></li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
header {
  background-color: #282a44;
  height: 100vh;
  width: 200px;
  position: fixed;
  z-index: 10;
}

nav > ul {
  margin: 50px 0 0 0;
  padding: 0;
}

a {
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  color: #fff;
  text-decoration: none;
  font-size: 14px;
}
</style>


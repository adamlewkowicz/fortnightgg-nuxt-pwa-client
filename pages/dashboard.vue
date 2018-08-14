<template>
  <div>
    <dashboard-nav />
    <main>
      <nuxt-child/>
    </main>
  </div>
</template>

<script>
import DashboardNav from '@/components/DashboardNav';

export default {
  layout: 'no-ssr',
  components: {
    DashboardNav
  }
}
</script>

<style lang="scss" scoped>
main {
  margin-left: 200px;
  padding: 60px 20px 20px 20px;
  box-sizing: border-box;
}
</style>




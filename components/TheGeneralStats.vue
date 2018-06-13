<template>
  <section>
    <h1>{{ stats.name }}</h1>
    <p>Last update: {{ updatedAt }}</p>
    <table class="general-stats">
      <tbody>
        <tr>
          <td class="sword">Matches:</td>
          <td>{{ stats.matchesplayed }}</td>
        </tr>
        <tr>
          <td class="clock">Hours:</td>
          <td>{{ parseInt(stats.minutesplayed/60) }}</td>
        </tr>
        <tr>
          <td class="sword">K/D ratio:</td>
          <td>{{ parseInt(stats.kdratio) }}</td>
        </tr>
        <tr>
          <td class="sword">Winratio:</td>
          <td>{{ Math.round(stats.winratio * 100) / 100}}%</td>
        </tr>
        <tr>
          <td class="sword">Kills:</td>
          <td>{{ stats.kills }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  props: ['stats', 'updatedAt']
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 40px;
}
section {
  width: 1000px;
  margin: 0 auto;
  margin-top: 150px;
}
.general-stats {
  font-size: 15px;
  min-width: 230px;
  border-collapse: collapse;
  tr {
    margin: 30px;
    td {
      border-bottom: 1px solid #2c2e4e;
      padding: 22px;
    }
    td:first-child {
      background-repeat: no-repeat;
      background-position: left;
      padding-left: 40px;
    }
    td:last-child {
      font-weight: bold;
    }
  }
}
.sword { background-image: url("~/assets/img/icons/sword-ico.png"); }
.clock { background-image: url("~/assets/img/icons/clock-ico.png"); }
</style>

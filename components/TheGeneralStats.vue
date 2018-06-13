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
        <tr class="gradi">
          <td class="clock">Hours:</td>
          <td>{{ parseInt(stats.minutesplayed/60) }}</td>
        </tr>
        <tr class="gradi2">
          <td class="sword">K/D ratio:</td>
          <td>{{ parseInt(stats.kdratio) }}</td>
        </tr>
        <tr class="gradi3">
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
@import "@/assets/css/index.scss";

h1 {
  font-size: 40px;
  margin: 20px 0;
}
.general-stats {
  width: 100%;
  font-size: 15px;
  min-width: 230px;
  border-collapse: collapse;
  tr {
    margin: 30px;
    td {
      // border-bottom: 1px solid #2c2e4e;
      padding: 22px;
    }
    td:first-child {
      background-repeat: no-repeat;
      background-position: 15px 25.5px;
      padding-left: 60px;
      @include tablet2 {
        padding-left: 100px;
        background-position-x: 25px;
      }
      @include small {
        padding-left: 60px;
        background-position-x: 15px;
      }
    }
    td:last-child {
      font-weight: bold;
    }
  }
}
.sword { background-image: url("~/assets/img/icons/sword-ico.png"); }
.clock { background-image: url("~/assets/img/icons/clock-ico.png"); }

.gradi {

  //  background: linear-gradient(to top, rgba(150, 230, 161, 1)  , rgba(255,0,0,0));
}

.gradi2 {
  // background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
  // background-image: linear-gradient(120deg,rgba(212, 252, 121, 1), rgba(150, 230, 161, 1));
  // background: linear-gradient(45deg , rgba(150, 230, 161, 1), rgba(212, 252, 121, 1));
  color: #72a010;
  background-color: #f6e58d;
  // background-image: radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%);
}

.gradi3 {
  // background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
  // background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%);
}
</style>

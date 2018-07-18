<template>
  <div>
    <div id="chartek"></div>
  </div>
</template>

<script>
import Vue from "vue";
import c3 from "c3";

export default {
  props: ['data'],
  data () {
    return {
    }
  },
  mounted() {
    const options = {
      data: {
        columns: [
          ['data1', 2, 4, 1, 5, 2, 1]
        ]
      }
    };
    const chart = c3.generate({
      bindto: "#chartek",
      data: {
        columns: [
          ['data1', 2, 4, 1, 5, 2, 1]
        ]
      }
    });

  }
}
</script>

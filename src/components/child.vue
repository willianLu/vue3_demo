<template>
  <h3>{{ msg }} - {{ title }}</h3>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    msg: String
  },
  setup() {
    return {
      title: "标题1️"
    };
  }
});
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
</style>

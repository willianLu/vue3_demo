<template>
  <h1>{{ msg }}</h1>
  <div>
      <input type="text" v-model="name" placeholder="请输入姓名" />
      <p>姓名：{{ name }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
      const name = ref<string>('');
      return {
          msg: "其他页面",
          name
      }
  }
});
</script>

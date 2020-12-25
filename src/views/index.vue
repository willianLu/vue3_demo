<template>
  <h1 ref="root">{{ msg }}</h1>
  <div>
    <button @click="handleTest">点击测试</button>
  </div>
  <Child msg="新的子组件"></Child>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Child from "@/components/child.tsx";

export default defineComponent({
  components: {
    Child
  },
  setup() {
    const msg = ref<string | number>("你好");
    const root = ref<Element | null>(null);
    return {
      msg,
      num: 0,
      root
    };
  },
  methods: {
    handleTest() {
      this.num++;
      this.msg = this.num;
    }
  }
});
</script>

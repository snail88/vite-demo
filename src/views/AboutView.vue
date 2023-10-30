<template>
  <div class="monacoEditor">
    <Monaco :option="editorp" />
  </div>
</template>
<script setup>
import Monaco from "./MonacoEditor.vue";
// 引入vue模块
import { ref, reactive } from 'vue';
const options = {
  language: 'javascript',
  code: `const str = "hello";`
}

const editorp = reactive({
  el: 'monaco',
  options: options
});
</script>
<style scoped>
.monacoEditor {
  width: 900px;
  height: 800px;
}
</style>
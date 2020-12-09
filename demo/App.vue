<template>
  <div id="app">
    <VueCodeJar v-model="code" :highlight="highlight" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { VueCodeJar } from '../src';
import Prism from 'prismjs';

export default Vue.extend({
  name: 'App',
  components: {
    VueCodeJar
  },
  data() {
    return {
      code: '',
      highlight: (editor: HTMLElement) => {
        const code = editor.textContent || '';
        const html = Prism.highlight(
          code,
          Prism.languages.javascript,
          'javascript'
        );
        editor.innerHTML = html;
      }
    };
  }
});
</script>

<style>
.vue-codejar {
  border-radius: 4px;
  border: 1px solid black;
  background-color: black;
  color: white;
  font-family: 'Source Code Pro', monospace;
  font-size: 14px;
  height: 340px;
  letter-spacing: normal;
  padding: 10px;
  tab-size: 2;
}
</style>

<template>
  <div class="about">
    <h1 @click="clickMe">This is an about page</h1>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  // setup() {},
  mounted() {
    console.log('我是about页面')
  },
  methods: {
    clickMe() {
      console.log(123)
    }
  }
})
</script>

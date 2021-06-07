<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" class="styleMore" />
  </svg>
</template>

<script lang="ts">
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    // 监听iconClass的变化而改变iconName
    iconName(): string {
      return `#${this.iconClass}`
    },
    // 监听className的变化而改变svgClass
    svgClass(): string {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

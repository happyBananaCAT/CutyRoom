<template>
    <div class="background-decorations">
      <div class="decoration-circle circle-1"></div>
      <div class="decoration-circle circle-2"></div>
      <div class="decoration-circle circle-3"></div>
    </div>
  </template>
  
  <script setup>
  // 可以添加props来自定义颜色/大小等
  const props = defineProps({
    colors: {
      type: Array,
      default: () => ['rgba(255, 0, 0, 0.1)', 'rgba(0, 0, 255, 0.1)', 'rgba(0, 255, 0, 0.1)']
    },
    sizes: {
      type: Array,
      default: () => [200, 300, 150]
    },
    blur: {
      type: Number,
      default: 30
    }
  });
  </script>
  
  <style lang="scss" scoped>
  .background-decorations {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    overflow: hidden;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    .decoration-circle {
      position: absolute;
      border-radius: 50%;
      filter: blur(v-bind('props.blur + "px"'));
      
      &.circle-1 {
        width: v-bind('props.sizes[0] + "px"');
        height: v-bind('props.sizes[0] + "px"');
        top: -50px;
        left: -50px;
        background: v-bind('props.colors[0]');
      }
      
      &.circle-2 {
        width: v-bind('props.sizes[1] + "px"');
        height: v-bind('props.sizes[1] + "px"');
        bottom: -100px;
        right: -100px;
        background: v-bind('props.colors[1]');
      }
      
      &.circle-3 {
        width: v-bind('props.sizes[2] + "px"');
        height: v-bind('props.sizes[2] + "px"');
        bottom: 20%;
        left: 30%;
        background: v-bind('props.colors[2]');
      }
    }
  }
  
  </style>
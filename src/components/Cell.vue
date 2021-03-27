<template>
  <div class="cell">
    <span class="game-number" v-show="shouldShow">
      {{ num }}
    </span>
  </div>
</template>

<script>
export default {
  name: "Cell",
  props: {
    num: Number,
    shouldShow: Boolean,
  },
};
</script>

<style scoped>
.cell {
  width: 100px;
  height: 100px;
  background: rgba(238, 228, 218, 0.35);
  text-align: center;
  line-height: 100px;
}
.game-number {
  font-size: 40px;
  font-weight: bold;
  user-select: none;
  color: #fff;
}
</style>

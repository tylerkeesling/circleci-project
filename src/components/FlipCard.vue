<template>
  <div :class="flipped ? 'flip-container flipped' : 'flip-container'">
    <div class="flipper">
      <div class="front">
        <slot name="front">
          <b-card> This is the front </b-card>
        </slot>
      </div>
      <div class="back">
        <slot name="back"> <b-card> This is the back </b-card> </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'flipped',
  },
  props: {
    flipped: {
      type: Boolean,
      default: false,
    },
  },
  name: 'FlipCard',
};
</script>

<style type="text/css" scoped>
.flip-container {
  -webkit-perspective: 1000;
  -moz-perspective: 1000;
  -o-perspective: 1000;
  perspective: 1000;
}
.flip-container {
  min-height: 120px;
}
.flipper {
  -moz-transform: perspective(1000px);
  -moz-transform-style: preserve-3d;
  position: relative;
}
.front,
.back {
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -o-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: 0.6s;
  -webkit-transform-style: preserve-3d;
  -moz-transition: 0.6s;
  -moz-transform-style: preserve-3d;
  -o-transition: 0.6s;
  -o-transform-style: preserve-3d;
  -ms-transition: 0.6s;
  -ms-transform-style: preserve-3d;
  transition: 0.6s;
  transform-style: preserve-3d;
  top: 0;
  left: 0;
  width: 100%;
}
.back {
  transform: rotateY(-180deg);
  position: absolute;
}
.flip-container.flipped .back {
  transform: rotateY(0deg);
}
.flip-container.flipped .front {
  transform: rotateY(180deg);
}
.front {
  z-index: 2;
}
</style>

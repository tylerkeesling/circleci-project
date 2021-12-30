<template>
  <div id="app">
    <Button id="increment-btn" @click="incrementCount" :msg="msg" />
    <div class="counter">
      I've been click <span id="count">{{ count }}</span> times.
    </div>
  </div>
</template>

<script>
import Button from "./components/Button.vue";

export default {
  name: "App",
  data() {
    return {
      msg: "Click Me 2",
      count: 0,
    };
  },
  components: {
    Button,
  },
  methods: {
    incrementCount() {
      this.count++;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: auto;
  margin-top: 200px;
}

.counter {
  margin-top: 2em;
}
</style>

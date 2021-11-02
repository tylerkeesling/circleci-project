<template>
  <button @click="$emit('click')">
    {{ msg }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  text-align: center;
  border-radius: 5px;
  font-size: 2rem;
  padding: 0.25em;
}
</style>

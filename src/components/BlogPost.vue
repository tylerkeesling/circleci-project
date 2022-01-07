<template>
  <b-card no-body class="text-left w-75 mx-auto">
    <b-card-body>
      <b-card-title>{{ post.title }}</b-card-title>
      <b-card-sub-title class="mb-2 font-italic">
        {{ post.description }}
      </b-card-sub-title>
      <b-card-text>
        {{ post.body }}
      </b-card-text>
    </b-card-body>
    <b-card-footer class="text-right font-italic font-weight-lighter">
      Author: {{ post.author }}
    </b-card-footer>
  </b-card>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped></style>

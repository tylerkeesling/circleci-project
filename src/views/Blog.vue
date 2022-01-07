<template>
  <b-container>
    <template v-if="!error">
      <h1 class="mb-10">Welcome to the blog</h1>
      <template v-for="post in posts">
        <blog-post class="mt-3" :key="post.id" :post="post"></blog-post>
      </template>
    </template>
    <template v-else>
      <h3>{{ errorMsg }}</h3>
    </template>
  </b-container>
</template>

<script>
import PostsService from '@/services/PostsService';
import BlogPost from '@/components/BlogPost';

export default {
  components: {
    BlogPost,
  },
  async created() {
    try {
      this.posts = await PostsService.list();
    } catch (err) {
      this.error = true;
      this.errorMsg = err.message;
    }
  },
  data() {
    return {
      posts: [],
      error: false,
      errorMsg: '',
    };
  },
};
</script>

<style lang="scss" scoped></style>

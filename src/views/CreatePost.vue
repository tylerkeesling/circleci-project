<template>
  <b-container class="col-md-6 col-sm-12">
    <b-overlay :show="waitingForVerification" rounded="sm">
      <b-card>
        <h2 class="p-3">Create a new blog post</h2>
        <b-form @submit.prevent="onSubmit">
          <b-form-group
            id="form-title-group"
            label="Title:"
            label-for="title"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              v-model="post.title"
              id="title"
              placeholder="Title..."
              required
              trim
              autocomplete="off"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="form-description-group"
            label="Description:"
            label-for="description"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              v-model="post.description"
              id="description"
              placeholder="Description..."
              type="text"
              required
              trim
              autocomplete="off"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="form-body-group"
            label="Body:"
            label-for="body"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-textarea
              v-model="post.body"
              id="body"
              placeholder="Spill your guts out..."
              required
              rows="6"
              autocomplete="off"
              trim
            ></b-form-textarea>
          </b-form-group>

          <b-button class="float-right" type="submit" variant="danger">
            Submit!
          </b-button>
          <b-button @click="generate" class="float-right mr-3" type="button"
            >Generate</b-button
          >
        </b-form>
      </b-card>
    </b-overlay>
    <div class="mt-3" v-if="error">
      <h4>You are forbidden from create blog posts.</h4>
    </div>
  </b-container>
</template>

<script>
import PostsService from '@/services/PostsService';
import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

export default {
  data() {
    return {
      post: {
        title: '',
        description: '',
        body: '',
      },
      error: false,
      errorMsg: '',
      waitingForVerification: false,
    };
  },
  methods: {
    async onSubmit() {
      try {
        this.waitingForVerification = true;
        await PostsService.create(this.post);
        this.$router.push('/blog');
      } catch (error) {
        this.error = true;
        this.errorMsg = error.message;
      } finally {
        this.waitingForVerification = false;
      }
    },
    generate() {
      this.post.title = lorem.generateWords(5);
      this.post.description = lorem.generateSentences(3);
      this.post.body = lorem.generateParagraphs(4);
    },
  },
};
</script>

<style lang="scss" scoped></style>

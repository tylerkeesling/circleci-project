<template>
  <div>This is the admin page {{ user }}</div>
</template>

<script>
import httpHandler from '@/services/httpHandler';
// import axios from 'axios';

export default {
  data() {
    return {
      user: {},
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      const user = await httpHandler.get('/test');
      this.user = user.data;
    },
  },
};
</script>

<style lang="scss" scoped></style>

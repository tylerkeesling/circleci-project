<template>
  <div>This is the admin page</div>
</template>

<script>
// import httpHandler from "@/services/httpHandler";
// import axios from 'axios';

export default {
  created() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      const baseUrl = `https://${process.env.VUE_APP_OKTA_DOMAIN}`;
      const response = await fetch(baseUrl + '/api/v1/users', {
        credentials: 'include',
      });
      const me = await response.json();
      console.log(me);
    },
  },
};
</script>

<style lang="scss" scoped></style>

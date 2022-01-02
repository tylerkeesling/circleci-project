<template>
  <b-container>
    <b-tabs pills content-class="mt-3">
      <b-tab @click="onAllUsers" title="All Users" active>
        <b-table striped hover :items="userTable"></b-table>
      </b-tab>

      <b-tab @click="onAllAdmins" title="Admins">
        <b-table striped hover :items="userTable">
          <template #cell(id)="data">
            <button
              :disabled="data.value === authState.accessToken.claims.uid"
              @click="onRemoveAdmin(data.value)"
            >
              {{ data.value }}
            </button>
          </template>
        </b-table>
      </b-tab>

      <b-tab @click="onNonAdmins" title="Regulars">
        <b-table striped hover :items="userTable">
          <template #cell(id)="data">
            <button @click="onAddAdmin(data.value)">
              {{ data.value }}
            </button>
          </template>
        </b-table>
      </b-tab>
    </b-tabs>
  </b-container>
</template>

<script>
// import httpHandler from '@/services/httpHandler';
import { getUsers, getAdmins, getNonAdmins } from '@/services/userService';
import groupService from '@/services/groupService';
// import axios from 'axios';

// const ADMIN_GROUP_ID = '00g3grzlxtmFbkIzZ5d7';

export default {
  data() {
    return {
      users: null,
    };
  },
  async created() {
    await this.getUsers();
  },
  computed: {
    userTable() {
      if (!this.users) return [];
      return this.users.map((user) => {
        return {
          id: user.id,
          first_name: user.profile.firstName,
          last_name: user.profile.lastName,
          email: user.profile.email,
        };
      });
    },
  },
  methods: {
    async onAllUsers() {
      this.users = [];
      await this.getUsers();
    },
    async onAllAdmins() {
      this.users = [];
      const admins = await getAdmins();
      this.users = admins.data;
    },
    async onNonAdmins() {
      this.users = [];
      const users = await getNonAdmins();
      this.users = users.data;
    },
    async getUsers() {
      const users = await getUsers();
      this.users = users.data;
    },
    async onAddAdmin(userId) {
      await groupService.addUser(userId);
      const users = await getNonAdmins();
      this.users = users.data;
    },
    async onRemoveAdmin(userId) {
      await groupService.deleteUser(userId);
      const admins = await getAdmins();
      this.users = admins.data;
    },
  },
};
</script>

<style lang="scss" scoped></style>

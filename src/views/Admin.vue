<template>
  <b-container>
    <b-tabs pills content-class="mt-3">
      <b-tab @click="onAllUsers" title="All Users" active>
        <b-table striped hover :items="userTable"></b-table>
      </b-tab>

      <b-tab @click="onAllAdmins" title="Admins">
        <b-table striped hover :items="userTable">
          <template #cell(id)="data">
            <b-button
              variant="danger"
              size="sm"
              :disabled="data.value === authState.accessToken.claims.uid"
              @click="onRemoveAdmin(data.value)"
            >
              <b-icon icon="x-circle" aria-hidden="true"></b-icon> Remove
            </b-button>
          </template>
        </b-table>
      </b-tab>

      <b-tab @click="onNonAdmins" title="Regulars">
        <b-table striped hover :items="userTable">
          <template #cell(id)="data">
            <b-button
              variant="success"
              size="sm"
              :disabled="data.value === authState.accessToken.claims.uid"
              @click="onAddAdmin(data.value)"
            >
              <b-icon icon="check-circle" aria-hidden="true"></b-icon> Add
            </b-button>
          </template>
        </b-table>
      </b-tab>
    </b-tabs>
  </b-container>
</template>

<script>
import userService from '@/services/userService';
import groupService from '@/services/groupService';

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
          first_name: user.profile.firstName,
          last_name: user.profile.lastName,
          email: user.profile.email,
          id: user.id,
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
      const admins = await userService.getAdmins();
      this.users = admins.data;
    },
    async onNonAdmins() {
      this.users = [];
      const users = await userService.getNonAdmins();
      this.users = users.data;
    },
    async getUsers() {
      const users = await userService.getUsers();
      this.users = users.data;
    },
    async onAddAdmin(userId) {
      await groupService.addUser(userId);
      const users = await userService.getNonAdmins();
      this.users = users.data;
    },
    async onRemoveAdmin(userId) {
      await groupService.deleteUser(userId);
      const admins = await userService.getAdmins();
      this.users = admins.data;
    },
  },
};
</script>

<style lang="scss" scoped></style>

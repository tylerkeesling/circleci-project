<template>
  <b-container>
    <b-tabs pills content-class="mt-3">
      <b-tab @click="onAllUsers" title="All Users" active>
        <b-table striped hover :items="userTable">
          <template #cell(user_type)="data">
            <b-dropdown
              id="user-type-dropdown"
              :text="data.item.user_type"
              class="w-75 m-2"
              variant="success"
              :disabled="authState.me.sub === data.item.id"
            >
              <b-dropdown-item-button
                @click="onEditUser(data.item.id, role)"
                v-for="role in roles"
                :key="role"
              >
                {{ role }}
              </b-dropdown-item-button>
            </b-dropdown>
          </template>
        </b-table>
      </b-tab>
    </b-tabs>
  </b-container>
</template>

<script>
import groupService from '@/services/groupService';
import UserService from '../services/UsersService';

const ROLES = {
  ROLE_ADMIN: 'Admin',
  ROLE_EDITOR: 'Editor',
  ROLE_BASE: 'User',
};

export default {
  data() {
    return {
      users: null,
      roles: ROLES,
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
          first_name: user.profile.given_name || user.profile.firstName,
          last_name: user.profile.family_name || user.profile.lastName,
          email: user.profile.email,
          user_type:
            ROLES[user.profile.userRole] ||
            ROLES[user.profile.role] ||
            ROLES.ROLE_BASE,
        };
      });
    },
  },
  // beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     if (vm.authState.isAdmin) {
  //       next();
  //     } else {
  //       next({ path: '/' });
  //     }
  //   });
  // },
  methods: {
    async onEditUser(userId, role) {
      const roleKey = Object.keys(this.roles).find(
        (key) => this.roles[key] === role
      );
      const updatedUser = await UserService.update(userId, { role: roleKey });
      this.users.find((user, idx) => {
        if (user.id === updatedUser.data.id) {
          this.$set(this.users, idx, updatedUser.data);
        }
      });
    },
    async onAllUsers() {
      this.users = [];
      await this.getUsers();
    },
    async onAllAdmins() {
      this.users = [];
      const admins = await UserService.getAdmins();
      this.users = admins.data;
    },
    async onNonAdmins() {
      this.users = [];
      try {
        console.log();
        const users = await UserService.getAdmins();
        this.users = users.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getUsers() {
      const users = await UserService.getUsers();
      this.users = users.data;
    },
    async onAddAdmin(userId) {
      await groupService.addUser(userId);
      const users = await UserService.getNonAdmins();
      this.users = users.data;
    },
    async onRemoveAdmin(userId) {
      await groupService.deleteUser(userId);
      const admins = await UserService.getAdmins();
      this.users = admins.data;
    },
  },
};
</script>

<style lang="scss" scoped></style>

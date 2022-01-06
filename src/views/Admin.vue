<template>
  <b-container class="vld-parent mh-50vh" ref="formContainer">
    <b-tabs pills content-class="mt-3">
      <b-tab @click="onAllUsers" title="All Users" active>
        <div>
          <b-table striped hover :items="userTable">
            <template #cell(user_type)="data">
              <div class="vld-parent" :ref="data.item.id">
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
              </div>
            </template>
          </b-table>
        </div>
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
  async mounted() {
    let loader = this.$loading.show({
      container: this.$refs.formContainer,
    });
    await this.getUsers();
    loader.hide();
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
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.authState.isAdmin) {
        next();
      } else {
        next({ path: '/' });
      }
    });
  },
  methods: {
    async onEditUser(userId, role) {
      let loader = this.$loading.show({
        container: this.$refs[userId],
        height: 50,
        width: 50,
      });
      const roleKey = Object.keys(this.roles).find(
        (key) => this.roles[key] === role
      );
      try {
        const updatedUser = await UserService.update(userId, { role: roleKey });
        this.users.find((user, idx) => {
          if (user.id === updatedUser.data.id) {
            this.$set(this.users, idx, updatedUser.data);
          }
        });
      } catch (err) {
        console.error(err);
      } finally {
        loader.hide();
      }
    },
    async onAllUsers() {
      this.users = [];
      await this.getUsers();
    },
    async getUsers() {
      const users = await UserService.getUsers();
      this.users = users.data;
    },
  },
};
</script>

<style scoped>
.mh-50vh {
  min-height: 50vh;
}

button:disabled {
  pointer-events: all !important;
  cursor: not-allowed;
}
</style>

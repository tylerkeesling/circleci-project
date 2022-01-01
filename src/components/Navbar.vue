<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand href="/">
        <img id="logo" src="../assets/twizzlers-logo.png" alt="Logo" />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="authState.isAuthenticated">
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="about">About</b-nav-item>
          <b-nav-item v-if="isadmin" to="admin">Admin</b-nav-item>
        </b-navbar-nav>

        <!-- user is logged in -->
        <b-navbar-nav v-if="authState.isAuthenticated" class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ username }}</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item @click="onSignOut">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <!-- user is not logged in -->
        <b-navbar-nav v-if="!authState.isAuthenticated" class="ml-auto">
          <b-nav-item to="/login">Log in</b-nav-item>
          <b-nav-item @click="onSignUp">Sign Up</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      isadmin: false,
    };
  },
  computed: {
    username() {
      return this.name;
    },
    admin() {
      return this.isadmin;
    },
  },
  created() {
    this.isAdmin();
  },
  methods: {
    async onSignOut() {
      await this.$auth.signOut();
    },
    onLogIn() {
      this.$auth.signInWithRedirect({ originalUri: '/about' });
    },
    onSignUp() {
      console.log('onSignUp clicked');
    },
    async isAdmin() {
      const { groups = [], name } = await this.$auth.token.getUserInfo();
      this.name = name;

      this.isadmin = groups.length > 0;
    },
  },
};
</script>

<style scoped>
#logo {
  width: 93px;
}

.bg-primary {
  background-color: '#3E82FC';
}
</style>

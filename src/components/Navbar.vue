<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="/">My App</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="this.$parent.authenticated">
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="about">About</b-nav-item>
          <b-nav-item to="admin">Admin</b-nav-item>
        </b-navbar-nav>

        <!-- user is logged in -->
        <b-navbar-nav v-if="this.$parent.authenticated" class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ username }}</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item @click="onSignout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <!-- user is not logged in -->
        <b-navbar-nav v-if="!this.$parent.authenticated" class="ml-auto">
          <b-nav-item @click="onLogIn">Log in</b-nav-item>
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
      name: "hello",
    };
  },
  computed: {
    username() {
      return this.$parent.user.name;
    },
  },
  methods: {
    async onSignout() {
      await this.$auth.signOut();
      this.$router.push("/");
    },
    onLogIn() {
      this.$auth.signInWithRedirect({ originalUri: "/about" });
    },
    onSignUp() {
      console.log("onSignUp clicked");
    },
  },
};
</script>

<style scoped></style>

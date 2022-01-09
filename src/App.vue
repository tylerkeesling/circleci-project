<template>
  <div id="app">
    <div id="nav">
      <Navbar />
    </div>
    <div class="float-right mr-4">{{ roleDisplay }}</div>
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';

export default {
  components: {
    Navbar,
  },
  computed: {
    roleDisplay() {
      if (this.authState.isAuthenticated) {
        return this.authState.me.user_role;
      }

      return '';
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding-bottom: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

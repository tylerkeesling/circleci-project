<template>
  <b-container>
    <h1>Welcome to Twizzlers</h1>
    <div v-if="authState.isAuthenticated">
      You are logged in as {{ authState.me.name }}
    </div>
    <div v-else>You are not logged in.</div>
  </b-container>
</template>

<script>
export default {};
</script>

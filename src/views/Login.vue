<template>
  <b-container class="col-md-5 col-sm-10">
    <b-card class="">
      <b-img :src="require('../assets/twizzlers-logo.png')" height="80" />
      <h2 class="p-3">Login</h2>
      <b-form @submit.prevent="onLogin">
        <b-form-group
          id="form-email-group"
          label="Email address:"
          label-for="email"
          label-cols-sm="3"
          label-align-sm="right"
        >
          <b-form-input
            v-model="credentials.email"
            id="email"
            placeholder="Enter your email"
            required
            trim
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="form-password-group"
          label="Password:"
          label-for="password"
          label-cols-sm="3"
          label-align-sm="right"
        >
          <b-form-input
            v-model="credentials.password"
            id="password"
            placeholder="Enter your password"
            type="password"
            required
            trim
          ></b-form-input>
        </b-form-group>

        <b-button class="float-right" type="submit" variant="primary">
          Login
        </b-button>
      </b-form>

      <template #footer>
        <div class="text-right">
          Don't have a login?
          <b-link to="/register">Register Here.</b-link>
        </div>
        <div class="text-right">
          <b-link to="/register">Forget Password</b-link>
        </div>
      </template>
    </b-card>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      credentials: {
        email: '',
        password: '',
      },
    };
  },
  mounted() {},
  methods: {
    async onLogin() {
      try {
        console.log(this.$auth);
        const user = await this.$auth.signInWithCredentials({
          username: this.credentials.email,
          password: this.credentials.password,
        });

        const getWithoutPrompt = await this.$auth.token.getWithoutPrompt({
          responseType: ['id_token', 'access_token'],
          sessionToken: user.data.sessionToken,
        });

        console.log('getWithoutPrompt', getWithoutPrompt);

        // await this.$auth.tokenManager.setTokens(getWithoutPrompt.tokens);

        await this.$auth.handleLoginRedirect(getWithoutPrompt.tokens);
      } catch (error) {
        console.log('THIS IS MY ERROR', error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>

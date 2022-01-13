<template>
  <b-container class="col-md-4 col-sm-10">
    <b-overlay :show="waitingForVerification" rounded="sm">
      <b-card>
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
    </b-overlay>
    <h4 class="mt-3" v-if="showMessage">We've sent you a push notification.</h4>
    <h4 class="mt-3" v-if="showError">An error has occured.</h4>
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
      showMessage: false,
      showError: false,
      waitingForVerification: false,
    };
  },
  mounted() {},
  methods: {
    async onLogin() {
      try {
        this.waitingForVerification = true;
        const transaction = await this.$auth.signInWithCredentials({
          username: this.credentials.email,
          password: this.credentials.password,
        });

        if (transaction.status === 'MFA_REQUIRED') {
          const factor = transaction.factors.find((factor) => {
            return factor.provider === 'OKTA' && factor.factorType === 'push';
          });

          const verified = await factor.verify({ autoPush: true });

          this.showMessage = true;

          const x = await verified.poll();

          // if (transaction.status === 'MFA_REQUIRED') {
          //   const factor = transaction.factors.find((factor) => {
          //     return (
          //       factor.provider === 'OKTA' &&
          //       factor.factorType === 'token:software:totp'
          //     );
          //   });

          // const verified = await factor.verify({ passCode: this.passcode });

          const tokens = await this.$auth.token.getWithoutPrompt({
            sessionToken: x.sessionToken,
          });

          this.$auth.handleLoginRedirect(
            tokens.tokens,
            window.location.origin + 'login/callback'
          );
        } else if (transaction.status === 'SUCCESS') {
          const tokens = await this.$auth.token.getWithoutPrompt({
            responseType: ['id_token', 'access_token'],
            sessionToken: transaction.data.sessionToken,
          });

          this.$auth.handleLoginRedirect(
            tokens.tokens,
            window.location.origin + 'login/callback'
          );
        }
      } catch (error) {
        this.waitingForVerification = false;
        this.showError = true;
        console.log('THIS IS MY ERROR', error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>

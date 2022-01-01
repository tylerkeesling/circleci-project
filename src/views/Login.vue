<template>
  <div class="login">
    <div id="ows-container"></div>
  </div>
</template>

<script>
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

import sampleConfig from '@/config';
export default {
  mounted() {
    this.$nextTick(function () {
      const { baseUrl, issuer, clientId, redirectUri, scopes } =
        sampleConfig.oidc;
      this.widget = new OktaSignIn({
        baseUrl,
        clientId,
        redirectUri,
        authParams: {
          issuer,
          scopes,
        },
        logo: require('@/assets/twizzlers-logo.png'),
        colors: {
          brand: '#FE2C54',
        },
      });

      this.widget
        .showSignInToGetTokens({
          el: '#ows-container',
          scopes,
        })
        .then((tokens) => {
          this.$auth.handleLoginRedirect(tokens);
        })
        .catch((err) => {
          throw err;
        });
    });
  },
  destroyed() {
    this.widget.remove();
  },
};
</script>

<style lang="scss" scoped></style>

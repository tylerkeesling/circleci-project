const {
  VUE_APP_BASE_URL: baseUrl,
  VUE_APP_CLIENT_ID: clientId,
  VUE_APP_ISSUER: issuer,
  VUE_APP_REDIRECT_URI: redirectUri,
  // OKTA_TESTING_DISABLEHTTPSCHECK,
} = process.env;

export default {
  oidc: {
    baseUrl,
    clientId,
    issuer,
    redirectUri,
    scopes: ['openid', 'profile', 'email', 'groups'],
    pkce: true,
    transformAuthState: async (oktaAuth, authState) => {
      if (!authState.isAuthenticated) {
        return authState;
      }
      // extra requirement: user must have valid Okta SSO session
      const user = await oktaAuth.token.getUserInfo();
      authState.isAuthenticated = !!user; // convert to boolean
      authState.me = user; // also store user object on authState
      authState.isAdmin = user?.groups?.length > 0;
      return authState;
    },
  },
  resourceServer: {
    messagesUrl: 'http://localhost:8000/api',
  },
};

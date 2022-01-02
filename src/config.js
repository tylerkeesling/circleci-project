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
    // useInteractionCodeFlow: USE_INTERACTION_CODE_FLOW,
    // testing: {
    //   disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
    // },
  },
  resourceServer: {
    messagesUrl: 'http://localhost:8000/api',
  },
};

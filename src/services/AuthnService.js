import client from './httpHandler';

class AuthnService {
  async primaryAuth(credentials) {
    const { email: username, password } = credentials;
    const data = {
      username,
      password,
    };
    const res = await client.post('/authn', data);
    return res;
  }

  async verifyFactor(factorId, stateToken, passCode = null) {
    const data = {
      stateToken,
      passCode,
    };

    const res = await client.post(`/authn/factors/${factorId}/verify`, data);

    return res;
  }
}

export default new AuthnService();

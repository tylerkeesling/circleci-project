import client from './httpHandler';

class UsersService {
  async getUsers() {
    const users = await client.get('/users');
    return users;
  }

  async update(userId, attributes) {
    const updates = {
      profile: {
        role: attributes.role,
      },
    };

    const res = await client.put(`/users/${userId}`, updates);

    return res;
  }

  async register(registrationForm) {
    const { firstName, lastName, email, password } = registrationForm;

    const res = await client.post('/users', {
      firstName,
      lastName,
      email,
      password,
    });

    return res;
  }

  async listFactorsToEnroll(userId) {
    const res = await client.post(`/users/${userId}/factors/catalog`);

    return res;
  }
}

export default new UsersService();

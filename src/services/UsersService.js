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

  async getAdmins() {
    const users = await client.get('/users/admins');
    return users;
  }
  async getNonAdmins() {
    const users = await client.get('/users/non-admins');
    return users;
  }
}

export default new UsersService();

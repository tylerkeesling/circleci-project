import client from './httpHandler';

export const getUsers = async () => {
  const users = await client.get('/users');
  return users;
};

export const getAdmins = async () => {
  const users = await client.get('/users/admins');
  return users;
};

export const getNonAdmins = async () => {
  const users = await client.get('/users/non-admins');
  return users;
};

class UserService {
  async getUsers() {
    const users = await client.get('/users');
    return users;
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

export default new UserService();

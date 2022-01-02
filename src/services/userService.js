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

  async getAdmins() {
    const users = await client.get('/users/admins');
    return users;
  }
  async getNonAdmins() {
    const users = await client.get('/users/non-admins');
    return users;
  }
}

const userService = new UserService();
export default userService;

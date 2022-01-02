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

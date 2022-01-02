import client from '@/services/httpHandler';

const ADMIN_GROUP_ID = '00g3grzlxtmFbkIzZ5d7';

class GroupService {
  async addUser(userId, groupId = ADMIN_GROUP_ID) {
    const user = await client.put(`/groups/${groupId}/users/${userId}`);
    return user;
  }

  async deleteUser(userId, groupId = ADMIN_GROUP_ID) {
    const res = await client.delete(`/groups/${groupId}/users/${userId}`);
    return res;
  }
}

const service = new GroupService();

export default service;

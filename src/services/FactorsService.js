import client from './httpHandler';

class FactorsService {
  async verify(userId, factorId, passcode) {
    const data = {
      userId,
      factorId,
      passcode,
    };

    const res = await client.post('/factors', data);

    return res;
  }
}

export default new FactorsService();

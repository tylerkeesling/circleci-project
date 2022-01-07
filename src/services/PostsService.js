import client from './httpHandler';

class PostsService {
  async list() {
    const { data: posts, status, code } = await client.get('/posts');

    if (code === 403) {
      throw new Error('You are not authorized too see my blog.');
    }

    console.log(code);
    return posts;
  }

  async create(post) {
    const { title, description, body } = post;
    const { status, code } = await client.post('/posts', {
      title,
      description,
      body,
    });

    if (code === 403) {
      throw new Error('You are not authorized to create blog posts.');
    }

    return { status };
  }
}

export default new PostsService();

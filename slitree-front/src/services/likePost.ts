import { api } from '@/api';
import { LikePostError } from '@/errors/LikePostError';

export async function likePost(postId: string) {
  try {
    const { data } = await api.post(`/likes/${postId}`);

    return data;
  } catch {
    throw new LikePostError();
  }
}
import { PostType } from '@/@types/Post';
import { api } from '@/api';
import { LOCAL_STORAGE_KEY } from '@/contexts/auth';
import { FetchingPostsError } from '@/errors/FetchingPostsError';

interface GetFilteredPostsParams {
  page?: number
  tam?: number
  type?: string
  userId?: string
  search?: string
}

interface GetFilteredPostsResponse {
  posts: PostType[]
}

export async function getFilteredPosts({ page, tam, type, search }: GetFilteredPostsParams) {
  try {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY);
    const { data } = await api.get<GetFilteredPostsResponse>('/posts/filter', {
      params: {
        page,
        tam,
        type,
        search
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.posts;
  } catch (error) {
    throw new FetchingPostsError();
  }
}
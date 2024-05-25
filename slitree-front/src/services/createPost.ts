import { PostType } from '@/@types/Post'
import { api } from '@/api'
import { CreatePostError } from '@/errors/CreateFileError'

interface CreatePostParams {
  description: string
  image: File | null
  title: string
  type: string
}

interface CreatePostResponse {
  post: PostType
}

export async function createPost({ description, image, title, type }: CreatePostParams) {
  try {
    const { data } = await api.post<CreatePostResponse>('/posts', { description, image, title, type }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (!data) {
      throw new CreatePostError()
    }

    return data.post
  } catch (error) {
    throw new CreatePostError()
  }
}
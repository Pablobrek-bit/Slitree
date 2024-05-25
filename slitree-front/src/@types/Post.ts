type AuthorType = {
  id: string
  name: string
  email: string
}

export interface PostType {
  id: string
  title: string
  description: string
  imageUrl: string
  createdAt: string
  updatedAt: string
  type: string
  author: AuthorType
  authorId?: string
  isLiked: boolean
  Like?: [{
    user: {
      id: string
      name: string
    }
  }]
}
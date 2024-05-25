export type PostWithoutAuthorId = Omit<Post, 'authorId'>;

export interface PostWithLike extends PostWithoutAuthorId {
  Like: {
    user: {
      id: string;
      name: string;
    };
  }[];
}

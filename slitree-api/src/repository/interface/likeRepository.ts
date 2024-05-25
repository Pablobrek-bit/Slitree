export interface LikeRepository {
  createLike(postId: string, userId: string): Promise<void>;
  deleteLike(postId: string, userId: string): Promise<void>;
  findByPostIdAndUserId(postId: string, userId: string): Promise<boolean>;
  getLikeCount(postId: string): Promise<number>;
}

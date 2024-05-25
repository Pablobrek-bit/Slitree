import { PostType } from "@/@types/Post";
import { LikeButton } from "./LikeButton";
import Image from "next/image";
import { Profile } from "./Profile";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { usePosts } from "@/contexts/posts";
import { toast } from "sonner";
import { useCallback, useState } from "react";
import { useAuth } from "@/contexts/auth";

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const { handleLikePost } = usePosts();

  const handleLikePostFn = useCallback(async () => {
    try {
      setIsLoading(true);
      await handleLikePost(post.id);
      [];
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [handleLikePost, post.id]);

  return (
    <article className="flex flex-col items-start justify-start gap-4 w-full max-w-full pb-4 border-b border-slate-300">
      <Profile
        icon={user?.id === post.author.id ? "myProfile" : "otherProfile"}
      >
        {post?.author?.name}
      </Profile>
      <span>{post?.description}</span>
      {post?.imageUrl && (
        <Image
          src={post?.imageUrl}
          className="w-full h-fit border-2 border-slate-200 rounded-lg"
          alt="image post"
          width={600}
          height={600}
        />
      )}
      <div className="flex items-center justify-between w-full font-sans">
        <LikeButton
          isLiked={post?.isLiked ?? false}
          onClick={handleLikePostFn}
          disabled={isLoading}
        />
        <div>
          <span className="text-slate-500 text-sm">
            {post?.createdAt &&
              format(new Date(post.createdAt), "HH:mm dd 'de' MMM. yyyy", {
                locale: ptBR,
              })}
          </span>
        </div>
      </div>
    </article>
  );
}

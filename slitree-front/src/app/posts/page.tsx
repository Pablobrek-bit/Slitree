"use client";
import { NewPost } from "@/components/NewPost";
import { Pagination } from "@/components/Pagination";
import { Post } from "@/components/Post";
import { Spinner } from "@/components/Spinner";
import { usePosts } from "@/contexts/posts";

export default function Posts() {
  const { posts, isFetchingPosts, page } = usePosts();
  return (
    <main className="flex flex-col flex-grow items-center flex-1 justify-start font-sans gap-8 w-full  overflow-y-auto h-full px-1 pb-8 posts-scrollbar lg:w-[36rem]">
      <NewPost />
      <section className="flex flex-col w-full gap-8 items-center h-full">
        {isFetchingPosts ? (
          <div className="text-teal-500 w-full flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          posts && posts.map((post) => <Post key={post.id} post={post} />)
        )}
        {posts && posts?.length === 0 && (
          <strong>Nenhum post encontrado.</strong>
        )}
        <Pagination />
      </section>
    </main>
  );
}

"use client";

import { PostType } from "@/@types/Post";
import { createPost } from "@/services/createPost";
import { getFilteredPosts } from "@/services/getFilteredPosts";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth } from "./auth";
import { LikePostError } from "@/errors/LikePostError";
import { likePost } from "@/services/likePost";

export type PostsContextType = {
  search: (search: string) => void;
  searchByType: (type: string) => void;
  handleCreatePost: (params: CretatePostParams) => Promise<void>;
  handleLikePost: (postId: string) => Promise<void>;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  isFetchingPosts?: boolean;
  posts: PostType[] | null;
  type: string;
  page: number;
};

interface CretatePostParams {
  title: string;
  description: string;
  type: string;
  image: File | null;
}

export const PostsContext = createContext<PostsContextType>(
  {} as PostsContextType,
);

export function PostsProvider({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  const [posts, setPosts] = useState<PostType[] | null>(null);
  const [isFetchingPosts, setIsFetchingPosts] = useState(true);
  const [filters, setFilters] = useState({
    page: 1,
    tam: 10,
    type: "",
    search: "",
  });

  const getPosts = useCallback(async () => {
    try {
      setIsFetchingPosts(true);
      const data = await getFilteredPosts(filters);
      setPosts(data);
    } finally {
      setIsFetchingPosts(false);
    }
  }, [filters]);

  const handleCreatePost = useCallback(
    async ({ description, image, title, type }: CretatePostParams) => {
      if (user) {
        const post = await createPost({ description, image, title, type });
        const newPost = {
          ...post,
          isLiked: false,
          author: {
            ...user,
          },
        };
        setPosts((prev) => (prev ? [newPost, ...prev] : [newPost]));
      }
    },
    [user],
  );

  const handleLikePost = useCallback(async (postId: string) => {
    try {
      await likePost(postId);

      setPosts(
        (prev) =>
          prev &&
          prev.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                isLiked: post.isLiked ? false : true,
              };
            }

            return post;
          }),
      );
    } catch {
      throw new LikePostError();
    }
  }, []);

  const search = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search, page: 1 }));
  }, []);

  const searchByType = useCallback((type: string) => {
    setFilters((prev) => ({ ...prev, type, page: 1 }));
  }, []);

  const goToNextPage = useCallback(() => {
    setFilters((prev) => ({ ...prev, page: prev.page + 1 }));
  }, []);

  const goToPreviousPage = useCallback(() => {
    setFilters((prev) => ({
      ...prev,
      page: prev.page < 1 ? prev.page - 1 : 1,
    }));
  }, []);

  const value = useMemo(
    () => ({
      posts,
      search,
      searchByType,
      handleCreatePost,
      handleLikePost,
      isFetchingPosts,

      goToNextPage,
      goToPreviousPage,
      page: filters.page,
      type: filters.type,
    }),
    [
      posts,
      search,
      searchByType,
      handleCreatePost,
      handleLikePost,
      isFetchingPosts,
      goToNextPage,
      goToPreviousPage,
      filters.type,
      filters.page,
    ],
  );

  useEffect(() => {
    if (user) {
      getPosts();
    }
  }, [user, filters, getPosts]);

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);

  if (!context) {
    throw new Error("usePosts must be used within an PostsProvider");
  }

  return context;
}

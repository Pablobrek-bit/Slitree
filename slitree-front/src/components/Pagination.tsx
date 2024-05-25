import { usePosts } from "@/contexts/posts";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination() {
  const { page, posts, goToNextPage, goToPreviousPage } = usePosts();
  return (
    <div className="size-fit flex items-center justify-between w-full pb-8">
      <span>Pagina {page}</span>
      <div className="size-fit flex items-center justify-center gap-3">
        <button
          className="bg-teal-50 hover:enabled:bg-teal-100 text-teal-700 font-bold p-2 rounded-md disabled:opacity-50"
          title="Anterior"
          disabled={page === 1}
          onClick={goToPreviousPage}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          className="bg-teal-50 hover:enabled:bg-teal-100 text-teal-700 font-bold p-2 rounded-md  disabled:opacity-50"
          onClick={goToNextPage}
          disabled={posts?.length === 0}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}

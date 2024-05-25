"use client";

import { ComponentProps, useCallback, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { usePosts } from "@/contexts/posts";

interface SearchProps extends ComponentProps<"input"> {}

export function Search(props: SearchProps) {
  const { search } = usePosts();
  const [value, setValue] = useState<string>("");

  const handleSearch = useCallback(() => {
    search(value);
  }, [search, value]);

  return (
    <div className="w-full flex bg-teal-50 rounded-lg justify-between items-center px-4 py-3">
      <input
        type="text"
        placeholder="Buscar"
        className="w-full outline-none bg-transparent font-sans text-slate-600"
        {...props}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button
        className="p-1 bg-transparent rounded-md hover:bg-teal-100 text-teal-700"
        onClick={handleSearch}
      >
        <SearchIcon size={24} />
      </button>
    </div>
  );
}

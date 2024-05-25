"use client";

import { usePosts } from "@/contexts/posts";
import { Topic } from "./Topic";
import { useCallback } from "react";
import { X } from "lucide-react";

const TOPICS = [
  {
    name: "Notícia",
    value: "noticia",
  },
  {
    name: "Edital",
    value: "edital",
  },
  {
    name: "Divulgação",
    value: "divulgacao",
  },
];

export function Topics() {
  const { type, searchByType } = usePosts();

  const handleSelect = useCallback(
    (type: string) => {
      searchByType(type);
    },
    [searchByType],
  );

  return (
    <div className="flex items-start justify-start gap-2 lg:flex-col lg:w-full">
      {TOPICS.map(({ name, value }) => (
        <Topic
          key={name}
          selected={value === type}
          onClick={() => handleSelect(value)}
        >
          {name}
        </Topic>
      ))}
      {type !== "" && (
        <button
          className="flex gap-2 text-rose-500 bg-slate-50 px-2 py-1 rounded-md lg:p-3 lg:w-full lg:bg-transparent lg:text-2xl items-center"
          onClick={() => handleSelect("")}
        >
          <X className="w-4 lg:w-6" />
          <span>Limpar</span>
        </button>
      )}
    </div>
  );
}

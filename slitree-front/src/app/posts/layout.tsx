"use client";

import { Logo } from "@/components/Logo";
import { Search } from "@/components/Search";
import { Topics } from "@/components/Topics";
import { LOCAL_STORAGE_KEY } from "@/contexts/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PostLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { push } = useRouter();

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_KEY) === null) {
      push("/sign-in");
    }
  }, [push]);

  return (
    <main className="flex flex-col pt-12 px-8 gap-8 justify-start items-center w-full overflow-hidden h-full max-h-full flex-shrink-0 md:flex-row md:items-start lg:justify-center">
      <div>
        <Logo className="px-4" />
      </div>
      <section className="flex gap-8 flex-col h-full lg:flex-row-reverse w-full lg:w-fit">
        <article className="inline-flex flex-col justify-start items-start gap-3  px-1 w-full lg:max-w-[20rem]">
          <Search />
          <div className="flex flex-col items-start justify-start font-sans w-fit lg:w-full">
            <span className="text-teal-800 text-2xl font-bold px-4 hidden lg:block">
              # Tópicos
            </span>
            <Topics />
          </div>
        </article>
        {children}
      </section>
    </main>
  );
}

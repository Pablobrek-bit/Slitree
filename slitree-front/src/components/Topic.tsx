import { ComponentProps } from "react";
import { Leaf } from "lucide-react";

interface TopicProps extends ComponentProps<"button"> {
  selected?: boolean;
}

export function Topic({ children, selected = false, ...props }: TopicProps) {
  return (
    <button
      className="flex gap-2 text-teal-500 bg-slate-50 px-2 py-1 rounded-md lg:p-3 lg:w-full lg:bg-transparent lg:text-2xl items-center data-[selected=true]:bg-slate-100"
      data-selected={selected}
      {...props}
    >
      <Leaf className="w-4 lg:w-6" />
      <span>{children}</span>
    </button>
  );
}
// w-full p-4 bg-white rounded-lg flex justify-start items-center gap-4 text-teal-500 text-2xl

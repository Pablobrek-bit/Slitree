import { ComponentProps } from "react";
import { Apple } from "lucide-react";

interface LikeButtonProps extends ComponentProps<"button"> {
  isLiked?: boolean;
}

export function LikeButton({ isLiked = true, ...props }: LikeButtonProps) {
  return (
    <button
      className="flex items-center justify-center gap-2 text-teal-600 text-base data-[liked=true]:text-rose-500 disabled:cursor-not-allowed disabled:opacity-70"
      data-liked={isLiked}
      {...props}
    >
      <Apple fill={isLiked ? "#F43F5E" : "transparent"} />
      <span className="font-medium">{isLiked ? "Curtido" : "Curtir"}</span>
    </button>
  );
}

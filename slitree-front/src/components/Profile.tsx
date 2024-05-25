import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";
import { TreePine } from "lucide-react";
import { cn } from "@/lib/cn";

const profileVariants = cva(
  "flex items-center justify-center w-10 h-10 rounded-full",
  {
    variants: {
      icon: {
        myProfile: "bg-teal-500 text-teal-50",
        otherProfile: "bg-teal-100 text-teal-500",
      },
    },
    defaultVariants: {
      icon: "otherProfile",
    },
  },
);

interface ProfileProps
  extends ComponentProps<"div">,
    VariantProps<typeof profileVariants> {}

export function Profile({ icon, className, children, ...props }: ProfileProps) {
  return (
    <div
      className="flex items-center justify-center gap-[10px] text-black font-bold font-sans text-lg"
      {...props}
    >
      <div className={cn(profileVariants({ icon, className }))}>
        <TreePine />
      </div>

      <span>
        {children}
        {icon === "myProfile" ? " (Você)" : ""}
      </span>
    </div>
  );
}

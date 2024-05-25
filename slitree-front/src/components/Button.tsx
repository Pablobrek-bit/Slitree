import { cn } from "@/lib/cn";
import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";
import { Spinner } from "./Spinner";

const buttonVariants = cva(
  "text-center flex items-center justify-center font-sans disabled:opacity-70",
  {
    variants: {
      intent: {
        filled: "bg-teal-500 text-teal-50 uppercase",
        ghost: "bg-transparent text-teal-500",
      },
      size: {
        base: "p-4 w-full h-16 text-lg font-bold rounded-lg",
        small: "px-4 py-2 text-sm font-medium rounded",
      },
    },
    defaultVariants: {
      intent: "filled",
      size: "base",
    },
  },
);

interface ButtonProps
  extends ComponentProps<"button">,
  VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export function Button({
  intent,
  size,
  className,
  children,
  disabled,
  isLoading = false,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(buttonVariants({ intent, size, className }))}
      {...props}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
}

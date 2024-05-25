import logo from "../assets/icon.svg";
import Image from "next/image";

interface LogoProps {
  type?: "base" | "small";
  className?: string;
}

export function Logo({ type = "base", className = "" }: LogoProps) {
  return (
    <div
      className={`flex items-center justify-center gap-2 flex-shrink-0 w-full ${className}`}
    >
      <Image src={logo} alt="logo" className="w-9 flex-shrink-0 max-w-9" />
      {type === "base" && (
        <h1 className="text-teal-700 font-sans font-medium fotn text-4xl block sm:hidden xl:block">
          Slitree
        </h1>
      )}
    </div>
  );
}

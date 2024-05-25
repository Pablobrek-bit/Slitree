import Image from "next/image";

import background from "@/assets/images/background.png";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <section className="size-full hidden md:block">
        <Image
          src={background}
          alt="Banner Slitree com a mensagem: Plantando ideais, conectando mentes"
          className="size-full object-cover"
        />
      </section>
      <section className="w-[32rem] h-full px-8 flex flex-col items-center justify-center">
        {children}
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth";
import { Toaster } from "sonner";
import { PostsProvider } from "@/contexts/posts";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Slitree",
  description: "Slitree é uma rede social que semeia ideias e conecta mentes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <PostsProvider>
        <html lang="pt-br" className="font-sans">
          <Toaster richColors />
          <body className={`${spaceGrotesk.variable} h-screen`}>
            {children}
          </body>
        </html>
      </PostsProvider>
    </AuthProvider>
  );
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/app/style/globals.css";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export const metadata: Metadata = {
  title: "삔아's Blog",
  description: "프론트엔드 개발자 삔아 기술 블로그",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
};

export default RootLayout;

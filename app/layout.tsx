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
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default RootLayout;

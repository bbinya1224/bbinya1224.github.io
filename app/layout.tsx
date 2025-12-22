import "@/app/style/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Provider as JotaiProvider } from "jotai";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import NextTopLoader from "nextjs-toploader";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <head>
        {/* Google Site Verification */}
        <meta
          name="google-site-verification"
          content="lmWHNnNVPVnXS1B-FC4sGMw-0mI1J4yb10kl4OZxTOY"
        />
      </head>

      <body>
        <NextTopLoader showSpinner={false} color="#fbbf24" />
        <JotaiProvider>
          <ThemeProvider attribute="class" enableSystem>
            {children}
          </ThemeProvider>
        </JotaiProvider>
      </body>
    </html>
  );
};

export const metadata: Metadata = {
  metadataBase: new URL("https://bbinya1224.github.io"),
  title: {
    default: "삔야's Blog",
    template: "%s | 삔야's Blog",
  },
  description: "프론트엔드 개발자 삔야 기술 블로그",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://bbinya1224.github.io",
    siteName: "삔야's Blog",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "lmWHNnNVPVnXS1B-FC4sGMw-0mI1J4yb10kl4OZxTOY",
  },
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

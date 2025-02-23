"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation"; // Import usePathname
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Get current route

  // List of pages where header/footer should be hidden
  const hideLayoutPages = ["/dashboard/roadmap/[roadmapId]"];

  const shouldHideLayout = hideLayoutPages.some((path) =>
    pathname.startsWith(path.replace("[roadmapId]", "")),
  );

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
          {!shouldHideLayout && <Header />}
          {children}
          {!shouldHideLayout && <Footer />}
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}

import { Providers } from "./providers";

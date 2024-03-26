import type { Metadata } from "next";
import localFont from "next/font/local";

import Sidebar from "@/components/Sidebar";
import "./globals.css";
import { sidebarWidth } from "./const";

const spoqa = localFont({
  src: [
    {
      path: "./fonts/SpoqaHanSansNeo-Regular.woff2",
      weight: "400",
    },
    {
      path: "./fonts/SpoqaHanSansNeo-Medium.woff2",
      weight: "500",
    },
    {
      path: "./fonts/SpoqaHanSansNeo-Bold.woff2",
      weight: "700",
    },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "이지퀀트",
  description: "쉽게 빠르게 만드는 나만의 퀀트! 이지 퀀트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${spoqa.className} bg-[#fafafa] text-black`}
        suppressHydrationWarning
      >
        <div className="flex h-full">
          <Sidebar />
          <div className="flex-1 py-12 pl-sidebar">
            <div className="mx-auto pb-20 px-8 w-[1200px]">
              <h1 className="mb-12 text-right text-2xl font-semibold text-purple-100">
                쉽고 빠르게 만드는 나만의 퀀트! 이지 퀀트
              </h1>
              <main>{children}</main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

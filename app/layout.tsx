import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "이지 퀀트",
  description: "쉽게 빠르게 만드는 나만의 퀀트! 이지 퀀트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#fafafa] text-black`}>
        <div className="flex h-full">
          <Sidebar />
          <div className="flex-1 py-12 pl-[284px]">
            <div className="px-8">
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

import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "波下乐土 Sailvage | Studio EmpteX",
  description:
    "你是UASA新入职的外勤专员，被派往一个海洋生态修复项目。而很快你发现，这并非简单的环保项目。",
  icons: {
    icon: `${basePath}/assets/logos/uasa.png`,
    shortcut: `${basePath}/assets/logos/uasa.png`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" data-ark-theme="ark" data-ark-depth="complex">
      <body>{children}</body>
    </html>
  );
}

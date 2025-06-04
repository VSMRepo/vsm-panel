import type { Metadata } from "next";
import TopBarServer from "@/components/landing/TopBarServer";

export const metadata: Metadata = {
  title: "VSM Panel",
  description: "Panel created by Grilo, to monitorate some VSM apps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopBarServer />
      {children}
    </>
  );
}

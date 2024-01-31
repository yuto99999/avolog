import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AvoLog",
  description: "Let's enjoy AvoLog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
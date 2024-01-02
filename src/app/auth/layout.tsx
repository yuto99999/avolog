import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthHeader from "../components/Header/authHeader";

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
        <AuthHeader />
        {children}
      </body>
    </html>
  );
}

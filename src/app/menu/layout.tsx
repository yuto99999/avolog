import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";
import { AuthProvider } from "../provider/authProvider";

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
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

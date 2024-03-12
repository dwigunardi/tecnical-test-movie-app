import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextProvider } from "@/components/nextUiprovider";
import { ThemeProviders } from "@/components/themeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie List App",
  description: "For Test Submission Only",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <NextProvider>
          <ThemeProviders>
            {children}
          </ThemeProviders>
        </NextProvider>
      </body>
    </html>
  );
}

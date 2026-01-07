import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans" });

export const metadata: Metadata = {
  title: "Yujia Bao - Machine Learning Researcher",
  description: "Machine Learning Researcher and Engineer. Associate Director at Accenture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${openSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
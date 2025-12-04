// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/app/components/CustomCursor";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: "Bull Mantra",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-brand-bg`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
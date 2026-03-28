import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Analytics from "@/components/Analytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SilvrStns — Handcrafted Silver Jewelry ",
  description:
    "Handcrafted silver jewelry. Minimal, simple, made to last.",
  openGraph: {
    title: "SilvrStns — Handcrafted Silver Jewelry",
    description: "Handcrafted silver jewelry. Minimal, simple, made to last.",
    images: ["/silvrstns_logo_mark_transparent.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "SilvrStns — Handcrafted Silver Jewelry",
    description: "Handcrafted silver jewelry. Minimal, simple, made to last.",
    images: ["/silvrstns_logo_mark_transparent.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <Analytics />
      </head>
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}

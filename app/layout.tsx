import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

// Site font.
// PLACEHOLDER (Issue 8): The design guide uses Montserrat (headings) and Roboto (body).
// Replace Geist with those fonts here and wire them up in globals.css.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Default title and description for every page.
export const metadata: Metadata = {
  title: "GlobalRoots",
  description:
    "Explore country cultural profiles: history, etiquette, and celebrations.",
};

// Root layout: wraps every page with the shared header and footer.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

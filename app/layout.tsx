import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GlobalRoots | Learn widely. Live kindly.",
  description: "Explore the rituals, flavors, and everyday wisdom that connect us across borders.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

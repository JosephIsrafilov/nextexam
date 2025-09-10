import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "ERP System", description: "Auth-first UI" };
export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

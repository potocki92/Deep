import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = { title: "GŁĘBIA Admin" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}

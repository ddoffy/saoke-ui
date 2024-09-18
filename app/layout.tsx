import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Doffy Law | Sao ke - var check - giao dich - ung ho - mien bac - bao lu - yagi",
  description: "Sao ke | Doffy Law | Tìm kiếm sao kê - giao dịch - var check - ủng hộ bão lũ yagi - miền bắc",
  keywords: ["Sao ke", "Doffy Law", "var check", "giao dich", "ung ho", "mien bac", "bao lu", "yagi"],
  viewport: "width=device-width, initial-scale=1",
  creator: "D. Doffy",
  publisher: "Doffy Law",
  authors: { name: "D. Doffy", url: 'https://doffylaw.org' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

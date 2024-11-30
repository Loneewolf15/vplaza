import { Inter } from "next/font/google";
import "./globals.css";

const poppins = Inter({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "Vplaza",
  description: "Your one-stop shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <link rel="manifest" href="/manifest.json" />
      <body>{children}</body>
    </html>
  );
}

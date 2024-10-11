import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight:["400"] });

export const metadata = {
  title: "Swifmart",
  description: "Your one stop Shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="manifest" href="/manifest.json" />
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
 
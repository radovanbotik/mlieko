import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "mlieko.sk",
    template: "%s | Mlieko.sk",
  },
  description: "vsetko o mlieku",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen p-4 space-y-4 flex flex-col">
        <header>
          <Navbar />
        </header>
        <main className="grow">{children}</main>
        <footer>footer</footer>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gazeta",
  description: "Digital newspaper viewer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-100 max-h-lvh h-screen p-2 flex gap-2`}
      >
        <aside className="bg-slate-50 border border-slate-300 rounded-lg shadow-sm w-2/12 p-2 resize-x overflow-auto min-w-[200px]">
          <Nav />
        </aside>
        <main className="bg-white border border-slate-300 rounded-lg shadow-sm w-5/12 p-2 resize-x overflow-auto min-w-[300px]">
          {children}
        </main>
        <aside className="w-5/12 bg-slate-50 border border-slate-300 rounded-lg shadow-sm grow p-2">
          <div className="text-center text-slate-400 pt-8">
            <p>Additional information panel</p>
          </div>
        </aside>
      </body>
    </html>
  );
}

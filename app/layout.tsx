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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-100 max-h-lvh h-screen p-3 flex gap-3`}
      >
        <aside className="bg-slate-50 border border-slate-300 rounded-lg shadow-sm w-4/12 p-3 resize-x overflow-auto min-w-[200px]">
          <Nav />
        </aside>
        <main className="bg-white border border-slate-300 rounded-lg shadow-sm w-6/12 p-3 resize-x overflow-auto min-w-[300px]">
          {children}
        </main>
        <aside className="bg-slate-50 border border-slate-300 rounded-lg shadow-sm grow p-3">
          <div className="text-center text-slate-400 pt-8">
            <p>Additional information panel</p>
          </div>
        </aside>
      </body>
    </html>
  );
}

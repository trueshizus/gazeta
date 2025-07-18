import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import Panel from "./components/Panel";

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
        <Panel as="aside" className="bg-slate-50 border-slate-300 w-4/12 p-3 resize-x overflow-auto min-w-[200px]">
          <Nav />
        </Panel>
        <Panel as="main" className="bg-white border-slate-300 w-6/12 p-3 resize-x overflow-auto min-w-[300px]">
          {children}
        </Panel>
        <Panel as="aside" className="bg-slate-50 border-slate-300 grow p-3">
          {/* Third column content goes here */}
        </Panel>
      </body>
    </html>
  );
}

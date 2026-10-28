import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
    title: "E-Summit '27 | VC Scout",
    description:
        "VC Scout at IIT BHU's E-Summit '27: Dawn of the Defiant.",
};

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body 
                className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-transparent text-white`}
            >
                <Header />
                <main className="flex-1 flex flex-col w-full">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}

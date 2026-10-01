import type { Metadata, Viewport } from "next";
import { DM_Sans, Press_Start_2P } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "mayur's desktop",
  description: "welcome to my website!",
  keywords: [
    "Mayur Banait",
    "Full-Stack Developer",
    "Software Engineer",
    "Portfolio",
    "Retro Desktop OS",
    "React.js",
    "Spring Boot",
    "Nagpur",
    "Bhopal SISTec-R",
  ],
  authors: [{ name: "Mayur Banait" }],
  openGraph: {
    title: "Mayur Banait | Interactive Desktop Portfolio",
    description:
      "Explore Mayur Banait's projects, experience, technical skills, and credentials in an interactive retro desktop environment.",
    type: "website",
    locale: "en_US",
    siteName: "Mayur Banait Portfolio",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#cfe3ff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${dmSans.variable} ${pressStart2P.variable}`}>
      <body className="antialiased min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

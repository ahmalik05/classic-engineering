import type { Metadata } from "next";
import { IBM_Plex_Mono, Libre_Franklin, Source_Sans_3 } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

const libreFranklin = Libre_Franklin({
  variable: "--font-libre-franklin",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Classic Engineering — 1959–1963 Cadillac Parts",
    template: "%s | Classic Engineering",
  },
  description:
    "Classic Engineering — preliminary parts catalog for vintage Cadillacs, model years 1959–1963 only.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${libreFranklin.variable} ${ibmPlexMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <CartProvider>
          <SiteHeader />
          <main className="mx-auto w-full max-w-[1400px] flex-1 px-3 py-3">
            {children}
          </main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}

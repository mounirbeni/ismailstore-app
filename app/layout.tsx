import type { Metadata, Viewport } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/app/context/CartContext";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Yed Lmiima — Cuisine Marocaine Authentique",
  description: "Commandez vos tajines, couscous, briwat et salades marocains à Marrakech. Livraison gratuite — offre limitée.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Yed Lmiima",
    statusBarStyle: "default",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: "#c0592f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geist.variable} ${playfair.variable} h-full antialiased`}>
      <head>
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
      <body className="min-h-full bg-[#efe3d3] lg:bg-cream">
        <CartProvider>
          {/* Mobile: phone-frame container. Desktop: full width */}
          <div className="mx-auto w-full max-w-[430px] lg:max-w-none bg-cream min-h-screen relative shadow-[0_0_40px_rgba(0,0,0,0.15)] lg:shadow-none">
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}

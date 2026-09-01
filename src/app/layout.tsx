import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Montserrat, Space_Grotesk } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { UIProvider } from "@/lib/ui-context";
import { VideoModal } from "@/components/modal/VideoModal";
import { ContactDrawer } from "@/components/contact/ContactDrawer";
import { ContactFab } from "@/components/contact/ContactFab";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-editorial",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-soft",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Rosa_shag — Манукян Роза | UGC-креатор beauty, fashion, lifestyle",
  description:
    "Манукян Роза — UGC-креатор с опытом блогинга 2+ года. Живой, эстетичный и нативный контент для beauty, fashion и lifestyle брендов.",
  keywords: [
    "UGC креатор",
    "user generated content",
    "beauty UGC",
    "fashion UGC",
    "TikTok реклама",
    "UGC видео",
  ],
};

export const viewport: Viewport = {
  themeColor: "#f0d0d8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${cormorant.variable} ${montserrat.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <UIProvider>
            <div className="relative z-[2]">{children}</div>
            <VideoModal />
            <ContactDrawer />
            <ContactFab />
          </UIProvider>
        </Suspense>
      </body>
    </html>
  );
}

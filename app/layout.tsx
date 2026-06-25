import type { Metadata, Viewport } from "next";
import { Anton, JetBrains_Mono, Inter } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Cursor } from "@/components/cursor";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FAF7EF",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://gobitsnbytes.org"),
  title: {
    default: "Bits&Bytes Kolkata",
    template: "%s | Bits&Bytes Kolkata",
  },
  description:
    "Kolkata's boldest teen-led code club. Build real projects, attend hackathons, and grow as a developer. 1500+ active members across India.",
  keywords: [
    "Bits&Bytes Kolkata",
    "teen code club kolkata",
    "kolkata hackathons for students",
    "coding club kolkata",
    "student developers kolkata",
    "teen tech community india",
    "hackathons in kolkata 2026",
  ],
  authors: [{ name: "Bits&Bytes Kolkata", url: "https://gobitsnbytes.org" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://gobitsnbytes.org",
    siteName: "Bits&Bytes Kolkata",
    title: "Bits&Bytes Kolkata — City of Joy. City of Builders.",
    description: "Kolkata's boldest teen-led builders club. Hackathons, build nights, real projects.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bits&Bytes Kolkata",
    description: "Kolkata's boldest teen-led builders club.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/logo-kolkata.png", type: "image/png" }],
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Bits&Bytes Kolkata",
  url: "https://gobitsnbytes.org",
  logo: "https://gobitsnbytes.org/logo-kolkata.png",
  description: "Teen-led code club in Kolkata running hackathons, workshops, and build sessions.",
  foundingDate: "2025",
  address: { "@type": "PostalAddress", addressLocality: "Kolkata", addressRegion: "West Bengal", addressCountry: "IN" },
  sameAs: [
    "https://www.linkedin.com/company/gobitsbytes",
    "https://github.com/gobitsnbytes-kol",
    "https://www.instagram.com/gobitsnbytes.kolkata",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${anton.variable} ${jbmono.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="font-sans">
        <Cursor />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

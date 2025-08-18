import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Marbella Hideaway - Luxury Villa Rental | Golden Mile, Marbella",
    template: "%s | Marbella Hideaway"
  },
  description: "Discover Marbella's most private hideaway. Luxury 6-bedroom villa with lagoon pool on the Golden Mile. Continental marble floors, bohemian design, 5 minutes to Puerto Banús.",
  keywords: [
    "Marbella villa rental",
    "luxury accommodation Marbella",
    "Golden Mile villa",
    "Puerto Banus villa",
    "Spanish villa rental",
    "lagoon pool villa",
    "bohemian villa Marbella",
    "private hideaway Spain",
    "luxury holiday rental"
  ],
  authors: [{ name: "Marbella Hideaway" }],
  creator: "Marbella Hideaway",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://marbellahideaway.com",
    siteName: "Marbella Hideaway",
    title: "Marbella Hideaway - Luxury Villa Rental | Golden Mile, Marbella",
    description: "Discover Marbella's most private hideaway. Luxury 6-bedroom villa with lagoon pool on the Golden Mile.",
    images: [
      {
        url: "/images/og/marbella-hideaway-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Marbella Hideaway luxury villa with lagoon pool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marbella Hideaway - Luxury Villa Rental",
    description: "Discover Marbella's most private hideaway. Luxury 6-bedroom villa with lagoon pool.",
    images: ["/images/og/marbella-hideaway-hero.jpg"],
    creator: "@marbellahideaway",
  },
  other: {
    "tiktok:creator": "@marbellahideaway",
    "tiktok:site": "@marbellahideaway",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#4A9B8E",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.cdnfonts.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              "name": "Marbella Hideaway",
              "description": "Luxury 6-bedroom villa rental with lagoon pool on Marbella's Golden Mile",
              "url": "https://marbellahideaway.com",
              "telephone": "+34-600-000-000",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Golden Mile",
                "addressLocality": "Marbella",
                "addressRegion": "Andalucia",
                "postalCode": "29602",
                "addressCountry": "ES"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 36.5108,
                "longitude": -4.8852
              },
              "amenityFeature": [
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Lagoon Pool"
                },
                {
                  "@type": "LocationFeatureSpecification", 
                  "name": "6 Luxury Bedrooms"
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Private Parking"
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Wi-Fi"
                }
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "147"
              }
            })
          }}
        />
      </head>
      <body className="font-inter">
        {children}
      </body>
    </html>
  );
}

import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import {
  generateOrganizationSchema,
  generateSoftwareApplicationSchema,
} from "./schema";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://docs.ecf.mseller.app"),
  title: {
    default:
      "eCF MSeller - Facturación Electrónica República Dominicana | DGII",
    // Keep the suffix short: Google truncates titles at ~60 characters, so
    // page titles carry their own keywords and only the brand is appended.
    template: "%s | eCF MSeller",
  },
  description:
    "Plataforma de integración para Facturación Electrónica (eCF) en República Dominicana. Solución completa para Comprobantes Fiscales Electrónicos (e-CF) certificada por DGII. Implementa facturación electrónica en tu negocio de forma sencilla y segura.",
  keywords: [
    "facturación electrónica",
    "facturación electrónica república dominicana",
    "eCF",
    "e-CF",
    "DGII",
    "comprobantes fiscales electrónicos",
    "factura electrónica dominicana",
    "Dirección General de Impuestos Internos",
    "API facturación electrónica",
    "integración DGII",
    "MSeller",
    "certificado digital",
    "firma electrónica",
    "XML facturación",
    "facturación digital RD",
    "comprobantes electrónicos DGII",
    "sistema facturación electrónica",
    "plataforma eCF",
    "certificación DGII",
    "certificación facturación electrónica",
    "CerteCF",
    "proceso certificación e-CF",
    "como certificar facturación electrónica DGII",
  ],
  authors: [{ name: "MSeller" }],
  creator: "MSeller",
  publisher: "MSeller",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "eCF MSeller - Facturación Electrónica República Dominicana | DGII",
    description:
      "Plataforma de integración para Facturación Electrónica (eCF) en República Dominicana. Solución completa para Comprobantes Fiscales Electrónicos certificada por DGII.",
    url: "https://docs.ecf.mseller.app",
    siteName: "eCF MSeller",
    locale: "es_DO",
    type: "website",
    images: [
      {
        url: "/images/logos/m-mseller.png",
        width: 1200,
        height: 630,
        alt: "eCF MSeller - Facturación Electrónica República Dominicana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "eCF MSeller - Facturación Electrónica DGII",
    description:
      "Plataforma de integración para Comprobantes Fiscales Electrónicos (e-CF) en República Dominicana certificada por DGII.",
    images: ["/images/logos/m-mseller.png"],
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
  category: "technology",
};

export default function Layout({ children }: { children: ReactNode }) {
  const organizationSchema = generateOrganizationSchema();
  const softwareSchema = generateSoftwareApplicationSchema();

  return (
    <html lang="es" className={inter.className} suppressHydrationWarning>
      <head>
        <meta name="geo.region" content="DO" />
        <meta name="geo.placename" content="República Dominicana" />
        <meta name="language" content="Spanish" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareSchema),
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}

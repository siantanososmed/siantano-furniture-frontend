import type { Metadata } from "next";
import "@/app/globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import TanstackQueryProvider from "@/components/tanstack-query/tanstack-query-provider";
import { GoogleTagManager } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import * as Sentry from "@sentry/nextjs";
import AosInit from "@/components/aos/aos";
import {
  DEFAULT_DESCRIPTIONS,
  generateLocalBusinessSchema,
  generateOrganizationSchema,
  generateWebsiteSchema,
  SITE_CONFIG,
} from "@/lib/seo";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.baseUrl),
  title: SITE_CONFIG.name,
  description: DEFAULT_DESCRIPTIONS["id"],
  keywords: [
    "furniture",
    "furnitur",
    "wooden furniture",
    "furnitur kayu",
    "Siantano",
    "Indonesia furniture",
    "export furniture",
    "local furniture",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  other: {
    ...Sentry.getTraceData(),
  },
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Generate JSON-LD schemas for the site
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema(locale);
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <GoogleTagManager
        gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER as string}
      />
      <body className="antialiased">
        <AosInit>
          <NextIntlClientProvider>
            <TanstackQueryProvider>{children}</TanstackQueryProvider>
          </NextIntlClientProvider>
        </AosInit>
        <SpeedInsights />
      </body>
    </html>
  );
}

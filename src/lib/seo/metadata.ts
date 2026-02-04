import type { Metadata } from "next";
import { type LocaleType, PAGE_SEO, SITE_CONFIG } from "./constants";

interface GenerateMetadataOptions {
  title: string;
  description: string;
  locale: LocaleType;
  path: string;
  images?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  }[];
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * Generates alternate language links for i18n
 */
export function generateAlternates(path: string, locale: LocaleType) {
  const languages: Record<string, string> = {};

  for (const loc of SITE_CONFIG.locales) {
    // For default locale (id), path doesn't include locale prefix
    const localePath =
      loc === SITE_CONFIG.defaultLocale ? path : `/${loc}${path}`;
    languages[loc] = `${SITE_CONFIG.baseUrl}${localePath}`;
  }

  // Canonical URL based on current locale
  const canonicalPath =
    locale === SITE_CONFIG.defaultLocale ? path : `/${locale}${path}`;

  return {
    canonical: `${SITE_CONFIG.baseUrl}${canonicalPath}`,
    languages,
  };
}

/**
 * Core metadata generator
 */
export function generatePageMetadata({
  title,
  description,
  locale,
  path,
  images,
  noIndex = false,
  type = "website",
  publishedTime,
  modifiedTime,
}: GenerateMetadataOptions): Metadata {
  const alternates = generateAlternates(path, locale);

  const ogImages = images?.length
    ? images.map((img) => ({
        url: img.url.startsWith("http")
          ? img.url
          : `${SITE_CONFIG.baseUrl}${img.url}`,
        width: img.width || 1200,
        height: img.height || 630,
        alt: img.alt || title,
      }))
    : [
        {
          url: `${SITE_CONFIG.baseUrl}${SITE_CONFIG.defaultOgImage}`,
          width: 920,
          height: 248,
          alt: SITE_CONFIG.name,
        },
      ];

  return {
    title,
    description,
    alternates,
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      siteName: SITE_CONFIG.name,
      images: ogImages,
      locale: locale === "id" ? "id_ID" : "en_US",
      alternateLocale: locale === "id" ? ["en_US"] : ["id_ID"],
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages.map((img) => img.url),
      creator: SITE_CONFIG.twitterHandle,
    },
  };
}

/**
 * Get page SEO data for static pages
 */
export function getPageSeo(pageKey: string, locale: LocaleType) {
  return PAGE_SEO[pageKey]?.[locale] || PAGE_SEO[pageKey]?.["en"];
}

/**
 * Generate metadata for product pages
 */
export function generateProductMetadata(
  product: ProductDetailDto,
  locale: LocaleType
): Metadata {
  const title = `${product.name} | Siantano Furniture`;
  const categoryText = product.category?.name || "";
  const materialsText = product.materials.map((m) => m.name).join(", ");

  // Clean HTML from description for meta
  const cleanDescription = product.description
    .replace(/<[^>]*>/g, "")
    .slice(0, 160);

  const description =
    locale === "id"
      ? `${product.name} - ${categoryText}. Material: ${materialsText}. ${cleanDescription}`
      : `${product.name} - ${categoryText}. Materials: ${materialsText}. ${cleanDescription}`;

  const images = product.thumbnail?.url
    ? [
        {
          url: product.thumbnail.url,
          width: 1200,
          height: 630,
          alt: product.thumbnail.alternativeText || product.name,
        },
      ]
    : undefined;

  return generatePageMetadata({
    title,
    description,
    locale,
    path: `/product/${product.slug}`,
    images,
    type: "website",
    publishedTime: product.publishedAt || undefined,
    modifiedTime: product.updatedAt,
  });
}

/**
 * Generate metadata for career detail pages
 */
export function generateCareerMetadata(
  job: JobDto,
  locale: LocaleType
): Metadata {
  const title =
    locale === "id"
      ? `${job.position} - Karir | Siantano Furniture`
      : `${job.position} - Careers | Siantano Furniture`;

  const description =
    locale === "id"
      ? `Lowongan ${job.position} di Siantano Furniture. Pengalaman: ${job.experience}. Bergabunglah dengan tim kami.`
      : `${job.position} position at Siantano Furniture. Experience: ${job.experience}. Join our team.`;

  return generatePageMetadata({
    title,
    description,
    locale,
    path: `/careers/${job.slug}`,
  });
}

/**
 * Generate metadata for catalog pages
 */
export function generateCatalogMetadata(
  type: "local" | "export",
  locale: LocaleType,
  category?: string
): Metadata {
  const pageKey = type === "local" ? "catalogLocal" : "catalogExport";
  const baseSeo = getPageSeo(pageKey, locale);

  let title = baseSeo?.title || "";
  const description = baseSeo?.description || "";

  // Customize if category is specified
  if (category) {
    title =
      locale === "id"
        ? `${category} - Katalog ${
            type === "local" ? "Lokal" : "Ekspor"
          } | Siantano Furniture`
        : `${category} - ${
            type === "local" ? "Local" : "Export"
          } Catalog | Siantano Furniture`;
  }

  return generatePageMetadata({
    title,
    description,
    locale,
    path: `/catalog/${type}`,
  });
}

/**
 * Generate metadata for search pages
 */
export function generateSearchMetadata(
  query: string | undefined,
  locale: LocaleType
): Metadata {
  const baseSeo = getPageSeo("search", locale);

  let title = baseSeo?.title || "";
  let description = baseSeo?.description || "";

  if (query) {
    title =
      locale === "id"
        ? `Hasil Pencarian "${query}" | Siantano Furniture`
        : `Search Results for "${query}" | Siantano Furniture`;
    description =
      locale === "id"
        ? `Hasil pencarian untuk "${query}" di katalog furnitur Siantano Furniture.`
        : `Search results for "${query}" in Siantano Furniture catalog.`;
  }

  return generatePageMetadata({
    title,
    description,
    locale,
    path: `/search${query ? `?q=${encodeURIComponent(query)}` : ""}`,
    noIndex: true, // Search pages typically shouldn't be indexed
  });
}

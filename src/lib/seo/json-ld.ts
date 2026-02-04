import { SITE_CONFIG } from "./constants";

/**
 * Organization schema for the company
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.baseUrl,
    logo: `${SITE_CONFIG.baseUrl}/logo.png`,
    sameAs: [
      "https://www.instagram.com/siantano_furniture",
      "https://www.tiktok.com/@siantano_furniture",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+62-822-2826-2788",
      contactType: "customer service",
      email: "hello@siantanofurniture.com",
      availableLanguage: ["English", "Indonesian"],
    },
  };
}

/**
 * WebSite schema for search functionality
 */
export function generateWebsiteSchema(locale: string) {
  const siteUrl =
    locale === "id" ? SITE_CONFIG.baseUrl : `${SITE_CONFIG.baseUrl}/${locale}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: locale === "id" ? "id-ID" : "en-US",
  };
}

/**
 * BreadcrumbList schema
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Product schema for furniture items
 */
export function generateProductSchema(
  product: ProductDetailDto,
  locale: string
) {
  const productUrl =
    locale === "id"
      ? `${SITE_CONFIG.baseUrl}/product/${product.slug}`
      : `${SITE_CONFIG.baseUrl}/${locale}/product/${product.slug}`;

  // Clean HTML tags from description
  const cleanDescription = product.description.replace(/<[^>]*>/g, "").trim();

  // Get all product images
  const images = [
    product.thumbnail?.url,
    ...product.product_colors.flatMap((pc) =>
      pc.productMedia.map((m) => m.url)
    ),
  ].filter(Boolean);

  // Get available colors
  const colors = product.product_colors
    .map((pc) => pc.color?.name)
    .filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: cleanDescription,
    url: productUrl,
    image: images,
    sku: product.slug,
    mpn: product.documentId,
    brand: {
      "@type": "Brand",
      name: SITE_CONFIG.name,
    },
    manufacturer: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
    },
    category: product.category?.name,
    material: product.materials.map((m) => m.name).join(", "),
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Finishing",
        value: product.finishings.map((f) => f.name).join(", "),
      },
      ...(colors.length > 0
        ? [
            {
              "@type": "PropertyValue",
              name: "Available Colors",
              value: colors.join(", "),
            },
          ]
        : []),
      {
        "@type": "PropertyValue",
        name: "Quality",
        value: product.category?.quality || "Local",
      },
    ],
    potentialAction: {
      "@type": "ContactAction",
      name: locale === "id" ? "Hubungi untuk penawaran" : "Contact for quote",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.baseUrl}${locale === "id" ? "" : `/${locale}`}/contact-us`,
      },
    },
  };
}

/**
 * JobPosting schema for career pages
 */
export function generateJobPostingSchema(job: JobDto, locale: string) {
  const jobUrl =
    locale === "id"
      ? `${SITE_CONFIG.baseUrl}/careers/${job.slug}`
      : `${SITE_CONFIG.baseUrl}/${locale}/careers/${job.slug}`;

  // Clean HTML tags from description
  const cleanDescription = (job.description || "")
    .replace(/<[^>]*>/g, "")
    .trim();

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.position,
    description: cleanDescription,
    datePosted: job.publishedAt,
    validThrough: new Date(
      new Date(job.publishedAt).setMonth(
        new Date(job.publishedAt).getMonth() + 3
      )
    ).toISOString(),
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      sameAs: SITE_CONFIG.baseUrl,
      logo: `${SITE_CONFIG.baseUrl}/logo.png`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "ID",
        addressRegion: "Central Java",
      },
    },
    experienceRequirements: job.experience,
    url: jobUrl,
  };
}

/**
 * LocalBusiness schema for the furniture company
 */
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.baseUrl,
    logo: `${SITE_CONFIG.baseUrl}/logo.png`,
    image: `${SITE_CONFIG.baseUrl}${SITE_CONFIG.defaultOgImage}`,
    telephone: "+62-822-2826-2788",
    email: "hello@siantanofurniture.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "ID",
    },
    sameAs: [
      "https://www.instagram.com/siantano_furniture",
      "https://www.tiktok.com/@siantano_furniture",
    ],
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  };
}

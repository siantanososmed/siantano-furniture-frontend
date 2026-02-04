import { MetadataRoute } from "next";
import httpClient from "@/lib/http";
import { SITE_CONFIG } from "@/lib/seo/constants";

type SitemapEntry = MetadataRoute.Sitemap[number];

// Helper to create URLs for both locales
function createLocalizedUrls(
  path: string,
  changeFrequency: SitemapEntry["changeFrequency"],
  priority: number,
  lastModified?: Date
): SitemapEntry[] {
  return SITE_CONFIG.locales.map((locale) => {
    const url =
      locale === SITE_CONFIG.defaultLocale
        ? `${SITE_CONFIG.baseUrl}${path}`
        : `${SITE_CONFIG.baseUrl}/${locale}${path}`;

    return {
      url,
      lastModified: lastModified || new Date(),
      changeFrequency,
      priority,
      alternates: {
        languages: SITE_CONFIG.locales.reduce(
          (acc, loc) => {
            acc[loc] =
              loc === SITE_CONFIG.defaultLocale
                ? `${SITE_CONFIG.baseUrl}${path}`
                : `${SITE_CONFIG.baseUrl}/${loc}${path}`;
            return acc;
          },
          {} as Record<string, string>
        ),
      },
    };
  });
}

// Fetch all products for sitemap
async function getAllProducts(): Promise<
  Array<{ slug: string; updatedAt: string }>
> {
  try {
    const response = await httpClient.get<PaginatedResponseDto<ProductDto>>(
      `${process.env.NEXT_PUBLIC_API_URL}/products`,
      {
        params: {
          fields: ["slug", "updatedAt"],
          pagination: { pageSize: 1000 },
        },
        fetchOptions: {
          next: { revalidate: 3600 }, // Revalidate every hour
        },
      }
    );
    return response.data?.data || [];
  } catch (error) {
    console.error("Failed to fetch products for sitemap:", error);
    return [];
  }
}

// Fetch all open jobs for sitemap
async function getAllJobs(): Promise<
  Array<{ slug: string; updatedAt: string }>
> {
  try {
    const response = await httpClient.get<PaginatedResponseDto<JobDto>>(
      `${process.env.NEXT_PUBLIC_API_URL}/jobs`,
      {
        params: {
          fields: ["slug", "updatedAt"],
          filters: { jobStatus: { $eqi: "Open" } },
          pagination: { pageSize: 100 },
        },
        fetchOptions: {
          next: { revalidate: 3600 },
        },
      }
    );
    return response.data?.data || [];
  } catch (error) {
    console.error("Failed to fetch jobs for sitemap:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, jobs] = await Promise.all([getAllProducts(), getAllJobs()]);

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    // Home page - highest priority
    ...createLocalizedUrls("/", "daily", 1.0),

    // Main navigation pages
    ...createLocalizedUrls("/our-story", "monthly", 0.8),
    ...createLocalizedUrls("/contact-us", "monthly", 0.8),
    ...createLocalizedUrls("/careers", "weekly", 0.7),

    // Catalog pages
    ...createLocalizedUrls("/catalog/local", "weekly", 0.9),
    ...createLocalizedUrls("/catalog/export", "weekly", 0.9),
  ];

  // Product pages
  const productPages: MetadataRoute.Sitemap = products.flatMap((product) =>
    createLocalizedUrls(
      `/product/${product.slug}`,
      "weekly",
      0.8,
      new Date(product.updatedAt)
    )
  );

  // Career detail pages
  const careerPages: MetadataRoute.Sitemap = jobs.flatMap((job) =>
    createLocalizedUrls(
      `/careers/${job.slug}`,
      "weekly",
      0.6,
      new Date(job.updatedAt)
    )
  );

  return [...staticPages, ...productPages, ...careerPages];
}

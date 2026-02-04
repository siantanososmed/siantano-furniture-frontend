// Site-wide SEO constants
export const SITE_CONFIG = {
  name: "Siantano Furniture",
  defaultLocale: "id",
  locales: ["en", "id"] as const,
  baseUrl:
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.siantanofurniture.com",
  twitterHandle: "@siantano_furniture",
  defaultOgImage: "/logo siantano.png",
} as const;

export type LocaleType = (typeof SITE_CONFIG.locales)[number];

// Default descriptions per locale
export const DEFAULT_DESCRIPTIONS: Record<LocaleType, string> = {
  en: "Siantano Furniture - Premium quality furniture for local and international markets. Discover our collection of handcrafted wooden furniture.",
  id: "Siantano Furniture - Furnitur berkualitas premium untuk pasar lokal dan internasional. Temukan koleksi furnitur kayu buatan tangan kami.",
};

// Page-specific SEO translations
export const PAGE_SEO: Record<
  string,
  Record<LocaleType, { title: string; description: string }>
> = {
  home: {
    en: {
      title: "Siantano Furniture | Premium Quality Wooden Furniture",
      description:
        "Discover Siantano Furniture's collection of premium handcrafted wooden furniture for home and commercial spaces. Quality furniture since establishment.",
    },
    id: {
      title: "Siantano Furniture | Furnitur Kayu Berkualitas Premium",
      description:
        "Temukan koleksi furnitur kayu premium buatan tangan Siantano Furniture untuk rumah dan ruang komersial. Furnitur berkualitas sejak berdiri.",
    },
  },
  ourStory: {
    en: {
      title: "Our Story | Siantano Furniture",
      description:
        "Learn about Siantano Furniture's journey, craftsmanship, and commitment to quality wooden furniture manufacturing.",
    },
    id: {
      title: "Tentang Kami | Siantano Furniture",
      description:
        "Pelajari perjalanan Siantano Furniture, keahlian, dan komitmen kami dalam pembuatan furnitur kayu berkualitas.",
    },
  },
  contactUs: {
    en: {
      title: "Contact Us | Siantano Furniture",
      description:
        "Get in touch with Siantano Furniture for business inquiries, partnerships, or custom furniture projects.",
    },
    id: {
      title: "Hubungi Kami | Siantano Furniture",
      description:
        "Hubungi Siantano Furniture untuk pertanyaan bisnis, kerja sama, atau proyek furnitur custom.",
    },
  },
  careers: {
    en: {
      title: "Careers | Siantano Furniture",
      description:
        "Join the Siantano Furniture team. Explore career opportunities in furniture manufacturing and design.",
    },
    id: {
      title: "Karir | Siantano Furniture",
      description:
        "Bergabung dengan tim Siantano Furniture. Jelajahi peluang karir di bidang pembuatan dan desain furnitur.",
    },
  },
  catalogLocal: {
    en: {
      title: "Local Products Catalog | Siantano Furniture",
      description:
        "Browse our local furniture collection. Premium quality furniture tailored for local market needs.",
    },
    id: {
      title: "Katalog Produk Lokal | Siantano Furniture",
      description:
        "Jelajahi koleksi furnitur lokal kami. Furnitur berkualitas premium yang disesuaikan untuk kebutuhan pasar lokal.",
    },
  },
  catalogExport: {
    en: {
      title: "Export Products Catalog | Siantano Furniture",
      description:
        "Explore our export-quality furniture collection. High-quality products for international markets.",
    },
    id: {
      title: "Katalog Produk Ekspor | Siantano Furniture",
      description:
        "Jelajahi koleksi furnitur kualitas ekspor kami. Produk berkualitas tinggi untuk pasar internasional.",
    },
  },
  search: {
    en: {
      title: "Search Products | Siantano Furniture",
      description:
        "Search our furniture catalog to find the perfect piece for your space.",
    },
    id: {
      title: "Cari Produk | Siantano Furniture",
      description:
        "Cari katalog furnitur kami untuk menemukan produk yang tepat untuk ruangan Anda.",
    },
  },
};

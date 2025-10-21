type PaginatedResponseDto<T> = {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};
type ResponseDto<T> = {
  data: T;
  meta: Record<string, unknown>;
};
type MediaDto = {
  id: number;
  documentId: string;
  url: string;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
  alternativeText?: string;
};
type CategoryDto = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  quality: string;
  icon: MediaDto;
};
type HeroDto = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  media: MediaDto;
};

type OurStoryDto = {
  id: number;
  documentId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  certificates: CertificateDto[];
};
type CertificateDto = {
  id: number;
  documentId: string;
  tagline: string;
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
  publishedAt: string; // ISO datetime string
  locale: string;
  icon: MediaDto;
};
type ProductDto = {
  id: number;
  documentId: string;
  name: string;
  description: string; // HTML string
  dimension: string; // HTML string
  weight: string; // HTML string
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
  publishedAt: string; // ISO datetime string
  locale: string;
  slug: string;
  thumbnail: MediaDto;
};

type ProductCollectionDto = {
  id: number;
  documentId: string;
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
  publishedAt: string; // ISO datetime string
  locale: string;
  products: ProductDto[];
};
type ShowcaseImageDto = {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: MediaDto;
  showcase_points: ShowcasePointDto[];
};

type ShowcasePointDto = {
  id: number;
  documentId: string;
  column: number;
  row: number;
  product: Pick<
    ProductDto,
    "id" | "documentId" | "name" | "slug" | "thumbnail"
  >;
};
type MaterialDto = {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  publishedAt: string;
  locale: string;
};
type ColorDto = {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  sample: MediaDto;
  slug: string;
  locale: string;
};
type FinishDto = {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
  locale: string;
};
type ProductDetailDto = {
  id: number;
  documentId: string;
  name: string;
  description: string;
  dimension: string;
  weight: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  publishedAt: string | null;
  locale: string;
  slug: string;
  thumbnail: MediaDto;
  product_colors: ProductColorDto[];
  materials: Pick<MaterialDto, "id" | "documentId" | "name">[];
  finishings: Pick<FinishDto, "id" | "documentId" | "name">[];
  category: Pick<
    CategoryDto,
    "id" | "documentId" | "name" | "slug" | "quality"
  >;
};
type ProductColorDto = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  color: Pick<ColorDto, "id" | "documentId" | "name" | "sample" | "slug">;
  productMedia: MediaDto[];
};
type JobDto = {
  id: number;
  documentId: string;
  position: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  experience: string;
  jobStatus: "Open" | "Closed" | string;
  slug: string;
};

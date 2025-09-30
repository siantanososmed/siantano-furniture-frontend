import axios from "axios";

export async function getHero({ locale }: { locale: string }) {
  const response = await axios.get<ResponseDto<HeroDto>>(
    `${process.env.NEXT_PUBLIC_API_URL}/hero`,
    {
      params: {
        populate: {
          media: {
            fields: ["url", "provider_metadata", "alternativeText"],
          },
        },
        locale,
      },
    }
  );

  return response.data;
}

export async function getRecommendedProducts({ locale }: { locale: string }) {
  const response = await axios.get<ResponseDto<ProductCollectionDto>>(
    `${process.env.NEXT_PUBLIC_API_URL}/recommended-product`,
    {
      params: {
        populate: {
          products: {
            fields: ["name", "slug"],
            populate: {
              thumbnail: {
                fields: ["url", "provider_metadata", "alternativeText"],
              },
            },
          },
        },
        locale,
      },
    }
  );

  return response.data;
}

export async function getShowcase({ locale }: { locale: string }) {
  const response = await axios.get<PaginatedResponseDto<ShowcaseImageDto>>(
    `${process.env.NEXT_PUBLIC_API_URL}/showcase-images`,
    {
      params: {
        populate: {
          image: {
            fields: ["url", "provider_metadata", "alternativeText"],
          },
          showcase_points: {
            fields: ["column", "row"],
            populate: {
              product: {
                fields: ["name", "slug"],
                populate: {
                  thumbnail: {
                    fields: ["url", "provider_metadata", "alternativeText"],
                  },
                },
              },
            },
          },
        },
        locale,
      },
    }
  );

  return response.data;
}

export async function getOurStory({ locale }: { locale: string }) {
  const response = await axios.get<ResponseDto<OurStoryDto>>(
    `${process.env.NEXT_PUBLIC_API_URL}/our-story`,
    {
      params: {
        populate: {
          certificates: {
            populate: {
              icon: {
                fields: ["url", "provider_metadata", "alternativeText"],
              },
            },
          },
        },
        locale,
      },
    }
  );

  return response.data;
}

export async function getCategories({
  locale,
  quality,
}: {
  locale: string;
  quality?: string;
}) {
  const response = await axios.get<PaginatedResponseDto<CategoryDto>>(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    {
      params: {
        populate: {
          icon: {
            fields: ["url", "provider_metadata", "alternativeText"],
          },
        },
        filters: {
          quality: {
            $eqi: quality?.toLowerCase() === "local" ? "local" : "export",
          },
        },
        pagination: { pageSize: 100 },
        locale,
      },
    }
  );

  return response.data;
}

export async function getMaterialOptions() {
  const response = await axios.get<PaginatedResponseDto<MaterialDto>>(
    `${process.env.NEXT_PUBLIC_API_URL}/materials`,
    {
      params: {
        pagination: { pageSize: 100 },
      },
    }
  );

  return response.data;
}

export async function getColorOptions() {
  const response = await axios.get<PaginatedResponseDto<ColorDto>>(
    `${process.env.NEXT_PUBLIC_API_URL}/colors`,
    {
      params: {
        pagination: { pageSize: 100 },
      },
    }
  );

  return response.data;
}

export async function getFinishOptions() {
  const response = await axios.get<PaginatedResponseDto<FinishDto>>(
    `${process.env.NEXT_PUBLIC_API_URL}/finishings`,
    {
      params: {
        pagination: { pageSize: 100 },
      },
    }
  );

  return response.data;
}

export async function getProduct({
  slug,
  locale,
}: {
  slug: string;
  locale: string;
}) {
  const response = await axios.get<ResponseDto<ProductDetailDto>>(
    `${process.env.NEXT_PUBLIC_API_URL}/product/slug/${slug}`,
    {
      params: {
        locale,
      },
    }
  );

  return response.data;
}

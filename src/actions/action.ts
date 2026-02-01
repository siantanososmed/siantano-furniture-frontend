"use server";
import httpClient from "@/lib/http";
import { FormData } from "formdata-node";
import axios from "axios";

export async function getHero({ locale }: { locale: string }) {
  const response = await httpClient.get<ResponseDto<HeroDto>>(
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
      fetchOptions: {
        next: {
          revalidate: 3 * 30 * 24 * 60 * 60,
        },
      },
    }
  );

  return response.data;
}

export async function getRecommendedProducts({ locale }: { locale: string }) {
  const response = await httpClient.get<ResponseDto<ProductCollectionDto>>(
    `${process.env.NEXT_PUBLIC_API_URL}/recommended-product`,
    {
      fetchOptions: {
        next: {
          revalidate: 30 * 24 * 60 * 60,
        },
      },
      params: {
        populate: {
          products: {
            fields: ["name", "slug"],
            populate: {
              thumbnail: {
                fields: ["url", "provider_metadata", "alternativeText"],
              },
              product_colors: {
                populate: {
                  productMedia: {
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

export async function getNewArrivalsProducts({ locale }: { locale: string }) {
  const response = await httpClient.get<ResponseDto<ProductCollectionDto>>(
    `${process.env.NEXT_PUBLIC_API_URL}/new-arrival`,
    {
      fetchOptions: {
        next: {
          revalidate: 30 * 24 * 60 * 60,
        },
      },
      params: {
        populate: {
          products: {
            fields: ["name", "slug"],
            populate: {
              thumbnail: {
                fields: ["url", "provider_metadata", "alternativeText"],
              },
              product_colors: {
                populate: {
                  productMedia: {
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

export async function getShowcase({ locale }: { locale: string }) {
  const response = await httpClient.get<PaginatedResponseDto<ShowcaseImageDto>>(
    `${process.env.NEXT_PUBLIC_API_URL}/showcase-images`,
    {
      fetchOptions: {
        next: {
          revalidate: 30 * 24 * 60 * 60,
        },
      },
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
  const response = await httpClient.get<ResponseDto<OurStoryDto>>(
    `${process.env.NEXT_PUBLIC_API_URL}/our-story`,
    {
      fetchOptions: {
        next: {
          revalidate: 3 * 30 * 24 * 60 * 60,
        },
      },
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
  const response = await httpClient.get<PaginatedResponseDto<CategoryDto>>(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    {
      fetchOptions: {
        next: {
          revalidate: 3 * 30 * 24 * 60 * 60,
        },
      },
      params: {
        populate: {
          icon: {
            fields: ["url", "provider_metadata", "alternativeText"],
          },
        },
        filters: {
          quality: {
            $eqi: quality?.toLowerCase() === "export" ? "export" : "local",
          },
        },
        sort: ["slug:asc"],
        pagination: { pageSize: 100 },
        locale,
      },
    }
  );

  return response.data;
}

export async function getMaterialOptions() {
  const response = await httpClient.get<PaginatedResponseDto<MaterialDto>>(
    `${process.env.NEXT_PUBLIC_API_URL}/materials`,
    {
      fetchOptions: {
        next: {
          revalidate: 3 * 30 * 24 * 60 * 60,
        },
      },
      params: {
        pagination: { pageSize: 100 },
      },
    }
  );

  return response.data;
}

export async function getColorOptions() {
  const response = await httpClient.get<PaginatedResponseDto<ColorDto>>(
    `${process.env.NEXT_PUBLIC_API_URL}/colors`,
    {
      fetchOptions: {
        next: {
          revalidate: 3 * 30 * 24 * 60 * 60,
        },
      },
      params: {
        pagination: { pageSize: 100 },
      },
    }
  );

  return response.data;
}

export async function getFinishOptions() {
  const response = await httpClient.get<PaginatedResponseDto<FinishDto>>(
    `${process.env.NEXT_PUBLIC_API_URL}/finishings`,
    {
      fetchOptions: {
        next: {
          revalidate: 3 * 30 * 24 * 60 * 60,
        },
      },
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
  const response = await httpClient.get<ResponseDto<ProductDetailDto>>(
    `${process.env.NEXT_PUBLIC_API_URL}/product/slug/${slug}`,
    {
      fetchOptions: {
        next: {
          revalidate: 3 * 30 * 24 * 60 * 60,
        },
      },
      params: {
        locale,
      },
    }
  );

  return response.data;
}

export async function postContactUs(data: {
  name: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
}) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/contact-uses`,
    {
      data,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_FORM_TOKEN}`,
      },
    }
  );
  return response.data;
}

export async function getDetailJob({ slug }: { slug: string }) {
  const response = await httpClient.get<ResponseDto<JobDto>>(
    `${process.env.NEXT_PUBLIC_API_URL}/jobs/slug/${slug}`,
    {
      fetchOptions: {
        cache: "default",
      },
    }
  );
  return response.data;
}

export async function postCareers(data: {
  jobSlug: string;
  name: string;
  email: string;
  phoneNumber: string;
  cv: File;
}) {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("phoneNumber", data.phoneNumber);
  formData.append("cv", data.cv);

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/jobs/${data.jobSlug}/apply`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_FORM_TOKEN}`,
      },
    }
  );

  return response.data;
}

export async function getHeroImage() {
  const response = await httpClient.get<ResponseDto<HeroImageDto>>(
    `${process.env.NEXT_PUBLIC_API_URL}/hero-image`,
    {
      params: {
        populate: {
          contactUsHero: {
            fields: ["url", "provider_metadata", "alternativeText"],
          },
          careerHero: {
            fields: ["url", "provider_metadata", "alternativeText"],
          },
          ourStoryHero: {
            fields: ["url", "provider_metadata", "alternativeText"],
          },
        },
      },
      fetchOptions: {
        cache: "default",
      },
    }
  );
  return response.data;
}

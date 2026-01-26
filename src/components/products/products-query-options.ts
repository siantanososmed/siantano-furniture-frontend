import { queryOptions } from "@tanstack/react-query";
import browserHttpClient from "@/lib/client-http";

type GetProductsParams = {
  locale: string;
  pagination?: {
    page?: number;
    pageSize?: number;
  };
  filter?: {
    material?: string[];
    color?: string[];
    finish?: string[];
    category?: string;
  };
  sort?: {
    by: "category" | "name";
    order: "asc" | "desc";
  };
};

const PAGE_SIZE = 20;

export async function getProducts({
  locale,
  pagination,
  filter,
}: GetProductsParams) {
  const filters: Record<string, unknown> = {};

  if (filter?.category) {
    filters.category = {
      slug: {
        $eqi: filter.category,
      },
    };
  }

  if (filter?.finish && filter?.finish?.length > 0) {
    filters.finishings = {
      slug: {
        $in: filter.finish,
      },
    };
  }

  if (filter?.material && filter?.material?.length > 0) {
    filters.materials = {
      slug: {
        $in: filter.material,
      },
    };
  }

  if (filter?.color && filter?.color?.length > 0) {
    filters.product_colors = {
      color: {
        slug: {
          $in: filter.color,
        },
      },
    };
  }

  const response = await browserHttpClient.get<
    PaginatedResponseDto<ProductDto>
  >(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    params: {
      populate: {
        thumbnail: {
          fields: ["url", "provider_metadata", "alternativeText"],
        },
        product_colors: {
          populate: {
            color: {
              fields: ["name", "slug"],
            },
            productMedia: {
              fields: ["url", "provider_metadata", "alternativeText"],
            },
          },
        },
      },
      filters,
      pagination,
      locale,
    },
  });

  return response.data;
}

type ProductsQueryParams = Omit<GetProductsParams, "pagination"> & {
  page?: number;
};

export const productsQueryOptions = (params: ProductsQueryParams) =>
  queryOptions({
    queryKey: ["products", params],
    queryFn: () =>
      getProducts({
        locale: params.locale,
        filter: params.filter,
        pagination: {
          page: params.page || 1,
          pageSize: PAGE_SIZE,
        },
      }),
  });

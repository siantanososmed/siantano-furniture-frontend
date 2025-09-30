import { infiniteQueryOptions } from "@tanstack/react-query";
import axios from "axios";

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

  const response = await axios.get<PaginatedResponseDto<ProductDto>>(
    `${process.env.NEXT_PUBLIC_API_URL}/products`,
    {
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
            },
          },
        },
        filters,
        pagination,
        locale,
      },
    }
  );

  return response.data;
}

export const productsQueryOptions = (
  params: Omit<GetProductsParams, "pagination">
) =>
  infiniteQueryOptions({
    queryKey: ["products", params],
    queryFn: ({ pageParam, queryKey }) =>
      getProducts({
        ...(queryKey[1] as Omit<GetProductsParams, "pagination">),
        pagination: {
          page: pageParam,
          pageSize: 50,
        },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.pagination.page < lastPage.meta.pagination.pageCount) {
        return lastPage.meta.pagination.page + 1;
      }
      return null;
    },
  });

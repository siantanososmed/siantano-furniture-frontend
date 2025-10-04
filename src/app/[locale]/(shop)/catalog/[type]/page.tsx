import { notFound } from "next/navigation";
import { Fragment } from "react";
import CategoryBreadcrumb from "@/components/breadcrumb/category-breadcrumb";
import { getLocale, getTranslations } from "next-intl/server";
import { getQueryClient } from "@/components/tanstack-query/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import CatalogCategory from "@/components/category/catalog-category";
import ProductsGrid from "@/components/products/products-grid";
import { productsQueryOptions } from "@/components/products/products-query-options";
import FilterProduct from "@/components/filter/filter-product";
import {
  getCategories,
  getColorOptions,
  getFinishOptions,
  getMaterialOptions,
} from "@/actions/action";
import { getFulfilledValue } from "@/lib/utils";

type CatalogProps = {
  params: Promise<{ type: string }>;
  searchParams: Promise<{
    category?: string;
    colors?: string | string[];
    materials?: string | string[];
    finishes?: string | string[];
    [key: string]: string | string[] | undefined;
  }>;
};

const allowedTypes = ["local", "export"];

export default async function Catalog({ params, searchParams }: CatalogProps) {
  const { type } = await params;
  const { category, ...restSearchParams } = await searchParams;
  const locale = await getLocale();
  const t = await getTranslations("Catalog");

  if (!allowedTypes.includes(type)) {
    notFound();
  }

  const [categoriesPromise, materialsPromise, colorsPromise, finishPromise] =
    await Promise.allSettled([
      getCategories({ locale, quality: type }),
      getMaterialOptions(),
      getColorOptions(),
      getFinishOptions(),
    ]);

  const categories = getFulfilledValue(categoriesPromise, "catalog.categories");
  const materials = getFulfilledValue(materialsPromise, "catalog.materials");
  const colors = getFulfilledValue(colorsPromise, "catalog.colors");
  const finishes = getFulfilledValue(finishPromise, "catalog.finishes");

  const pageBreadcrumb =
    categories?.data.find((cat) => cat.slug === category)?.name ||
    t("allCategories");

  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery(
    productsQueryOptions({
      locale,
      filter: {
        category,
        color:
          typeof restSearchParams.colors === "string"
            ? [restSearchParams.colors]
            : (restSearchParams.colors as string[]),
        material:
          typeof restSearchParams.materials === "string"
            ? [restSearchParams.materials]
            : (restSearchParams.materials as string[]),
        finish:
          typeof restSearchParams.finishes === "string"
            ? [restSearchParams.finishes]
            : (restSearchParams.finishes as string[]),
      },
    })
  );

  return (
    <>
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 mt-3">
        <CategoryBreadcrumb
          items={[
            {
              label:
                type === "local" ? t("localProducts") : t("exportProducts"),
              href: {
                pathname: `/catalog/${type}`,
                query: {
                  ...restSearchParams,
                },
              },
            },
            { label: pageBreadcrumb, href: `#` },
          ]}
        />
        <CatalogCategory categories={categories?.data || []} />
      </section>
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 mt-3">
        <div className="flex flex-row justify-between items-center">
          <FilterProduct
            materials={materials?.data || []}
            colors={colors?.data || []}
            finishes={finishes?.data || []}
          />
        </div>
      </section>
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 mt-3 min-h-96">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ProductsGrid />
        </HydrationBoundary>
      </section>
    </>
  );
}

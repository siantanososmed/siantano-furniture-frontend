import { getLocale, getTranslations } from "next-intl/server";
import { getQueryClient } from "@/components/tanstack-query/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { productsQueryOptions } from "@/components/products/products-query-options";
import CategoryBreadcrumb from "@/components/breadcrumb/category-breadcrumb";
import SearchProductsGrid from "@/components/search/search-products-grid";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: searchQuery, page } = await searchParams;
  const locale = await getLocale();
  const currentPage = Number(page) || 1;
  const t = await getTranslations("Search");

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    productsQueryOptions({
      locale,
      page: currentPage,
      filter: {
        search: searchQuery || "",
      },
    })
  );

  return (
    <>
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 mt-3">
        <CategoryBreadcrumb
          items={[
            {
              label: t("searchResults"),
              href: "/search",
            },
            {
              label: searchQuery || t("allProducts"),
              href: "#",
            },
          ]}
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">{t("searchResults")}</h1>
          {searchQuery && (
            <p className="text-muted-foreground">
              {t("searchingFor")}{" "}
              <span className="font-medium text-foreground">{`"${searchQuery}"`}</span>
            </p>
          )}
        </div>
      </section>
      <section
        data-aos="fade-down"
        className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 mt-6 min-h-96"
      >
        <HydrationBoundary state={dehydrate(queryClient)}>
          <SearchProductsGrid searchQuery={searchQuery || ""} />
        </HydrationBoundary>
      </section>
    </>
  );
}

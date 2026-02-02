"use client";
import { useQuery } from "@tanstack/react-query";
import { productsQueryOptions } from "@/components/products/products-query-options";
import { useLocale, useTranslations } from "next-intl";
import ProductCard from "@/components/products/product-card";
import { usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useMemo } from "react";
import { Search } from "lucide-react";

type SearchProductsGridProps = {
  searchQuery: string;
};

export default function SearchProductsGrid({
  searchQuery,
}: SearchProductsGridProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const query = useSearchParams();
  const t = useTranslations("Search");
  const currentPage = Number(query.get("page")) || 1;

  const { data, isLoading } = useQuery(
    productsQueryOptions({
      locale,
      page: currentPage,
      filter: {
        search: searchQuery,
      },
    })
  );

  // Deduplicate products by documentId (API may return duplicates when filtering by relations)
  const products = useMemo(() => {
    const rawProducts = data?.data || [];
    const seen = new Set<string>();
    return rawProducts.filter((product) => {
      if (seen.has(product.documentId)) {
        return false;
      }
      seen.add(product.documentId);
      return true;
    });
  }, [data?.data]);
  const pagination = data?.meta.pagination;
  const totalPages = pagination?.pageCount || 1;

  // Build URL with page parameter while preserving search query
  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams(query.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }
    const queryString = params.toString();
    return queryString ? `${pathname}?${queryString}` : pathname;
  };

  // Generate page numbers to display
  const pageNumbers = useMemo(() => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("ellipsis");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis");
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  }, [currentPage, totalPages]);

  // Show empty state when no products found and not loading
  if (!isLoading && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <Search className="size-12 mb-4 opacity-50" />
        <p className="text-lg font-medium">{t("noResults")}</p>
        <p className="text-sm mt-1">{t("tryDifferent")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={(i % 5) * 75}
                className="w-full min-h-52 border rounded-lg bg-gray-200 animate-pulse"
              />
            ))
          : products.map((product, i) => (
              <ProductCard
                index={i}
                key={product.documentId}
                product={product}
              />
            ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious href={buildPageUrl(currentPage - 1)} />
              </PaginationItem>
            )}

            {pageNumbers.map((page, index) =>
              page === "ellipsis" ? (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={page}>
                  <PaginationLink
                    href={buildPageUrl(page)}
                    isActive={page === currentPage}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext href={buildPageUrl(currentPage + 1)} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}


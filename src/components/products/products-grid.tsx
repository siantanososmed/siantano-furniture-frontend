"use client";
import { useQuery } from "@tanstack/react-query";
import { productsQueryOptions } from "@/components/products/products-query-options";
import { useLocale } from "next-intl";
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

export default function ProductsGrid() {
  const locale = useLocale();
  const pathname = usePathname();
  const query = useSearchParams();

  const colorsQueries = query.getAll("colors");
  const materialsQueries = query.getAll("materials");
  const finishesQueries = query.getAll("finishes");
  const currentPage = Number(query.get("page")) || 1;

  const { data, isLoading } = useQuery(
    productsQueryOptions({
      locale,
      page: currentPage,
      filter: {
        category: query.get("category") || undefined,
        color: colorsQueries.length > 0 ? colorsQueries : undefined,
        material: materialsQueries.length > 0 ? materialsQueries : undefined,
        finish: finishesQueries.length > 0 ? finishesQueries : undefined,
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

  // Build URL with page parameter while preserving other query params
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
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("ellipsis");
      }

      // Show pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis");
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  }, [currentPage, totalPages]);

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

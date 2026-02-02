"use client";
import { Link } from "@/i18n/navigation";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { ExternalLinkIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { careersQueryOptions } from "@/components/careers/careers-query-options";
import { queryUrlToObject, titleCase } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";

export default function CareersList() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const query = searchParams.get("query") || "";

  const { data, isLoading, isFetching } = useQuery(
    careersQueryOptions({
      query: query,
      pagination: { page: page, pageSize: 6 },
    })
  );

  if (isFetching || isLoading) {
    return (
      <div className="inline-flex w-full justify-center items-center py-6 min-h-[300px]">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <>
      {data?.data.length === 0 ? (
        <div
          data-aos="zoom-in"
          className="inline-flex justify-center items-center py-6 min-h-[300px]"
        >
          No job listings found.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-16 mb-10">
            {data?.data.map((job, index) => (
              <Item
                data-aos="fade-up"
                data-aos-delay={index * 100}
                key={job.documentId}
                variant="outline"
                asChild
                className="hover:shadow-md transition-shadow"
              >
                <Link
                  href={{
                    pathname: `/careers/${job.slug}`,
                  }}
                >
                  <ItemContent>
                    <ItemTitle>{titleCase(job.position)}</ItemTitle>
                    <ItemDescription>{job.experience}</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <ExternalLinkIcon className="size-4" />
                  </ItemActions>
                </Link>
              </Item>
            ))}
          </div>

          <Pagination>
            <PaginationContent>
              {data?.meta.pagination && data.meta.pagination.page > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    href={{
                      pathname: "/careers",
                      query: {
                        ...queryUrlToObject(searchParams),
                        page: Math.max(page - 1, 1),
                      },
                    }}
                  />
                </PaginationItem>
              )}
              {Array.from({
                length: data?.meta.pagination.pageCount || 0,
              }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href={{
                      pathname: "/careers",
                      query: {
                        ...queryUrlToObject(searchParams),
                        page: i + 1,
                      },
                    }}
                    isActive={i + 1 === data?.meta.pagination.page}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {data?.meta.pagination &&
                data.meta.pagination.page < data.meta.pagination.pageCount && (
                  <PaginationItem>
                    <PaginationNext
                      href={{
                        pathname: "/careers",
                        query: {
                          ...queryUrlToObject(searchParams),
                          page: Math.min(
                            page + 1,
                            data?.meta.pagination.pageCount || 1
                          ),
                        },
                      }}
                    />
                  </PaginationItem>
                )}
            </PaginationContent>
          </Pagination>
        </>
      )}
    </>
  );
}

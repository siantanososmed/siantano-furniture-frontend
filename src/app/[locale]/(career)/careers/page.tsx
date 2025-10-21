import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/components/tanstack-query/get-query-client";
import CareersList from "@/components/careers/careers-list";
import { careersQueryOptions } from "@/components/careers/careers-query-options";
import CareersSearch from "@/components/careers/careers-search";
import { getTranslations } from "next-intl/server";

export default async function CareersPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const { query, page } = await searchParams;
  const queryClient = getQueryClient();
  const t = await getTranslations("Careers");

  await queryClient.prefetchQuery(
    careersQueryOptions({
      pagination: {
        page: page ? parseInt(page) : 1,
        pageSize: 5,
      },
      query: query || "",
    })
  );

  return (
    <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 my-6">
      <div data-aos="zoom-in" className="text-3xl font-semibold sm:text-4xl">
        {t("careers")}
      </div>
      <div data-aos="zoom-in">
        <CareersSearch />
      </div>
      <div className="flex flex-col gap-4">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CareersList />
        </HydrationBoundary>
      </div>
    </section>
  );
}

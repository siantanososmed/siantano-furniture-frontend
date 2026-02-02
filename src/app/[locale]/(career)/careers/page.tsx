import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/components/tanstack-query/get-query-client";
import CareersList from "@/components/careers/careers-list";
import { careersQueryOptions } from "@/components/careers/careers-query-options";
import CareersSearch from "@/components/careers/careers-search";
import { getTranslations } from "next-intl/server";
import PageHero from "@/components/hero/page-hero";
import { getHeroImage } from "@/actions/action";
import { getFulfilledValue } from "@/lib/utils";

export default async function CareersPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const { query, page } = await searchParams;
  const queryClient = getQueryClient();
  const t = await getTranslations("Careers");
  const [heroImage] = await Promise.allSettled([getHeroImage()]);

  const heroImg = getFulfilledValue(heroImage, "careers.heroImage");

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
    <>
      <PageHero
        imageUrl={heroImg?.data?.careerHero?.url || ""}
        title={t("careers")}
      />
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <div className="text-center space-y-4 mb-10">
          <h2
            data-aos="fade-down"
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            {t("interestedInJoining")}
          </h2>
          <p
            data-aos="fade-up"
            className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg"
          >
            {t("description")}
          </p>
        </div>
        <div data-aos="zoom-in" className="max-w-2xl mx-auto mb-8">
          <CareersSearch />
        </div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CareersList />
        </HydrationBoundary>
      </section>
    </>
  );
}

"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Fragment } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { LayoutGrid } from "lucide-react";
import { useTranslations } from "next-intl";

export default function CatalogCategory({
  categories,
}: {
  categories: CategoryDto[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const t = useTranslations("Catalog");

  const restCategory = Object.fromEntries(searchParams.entries());
  delete restCategory.category;

  return (
    <Carousel
      opts={{
        dragFree: true,
      }}
    >
      <CarouselContent>
        <CarouselItem className="basis-36/100 md:basis-20/100 lg:basis-15/100 min-w-fit">
          <Link
            className="shrink-0 w-32 inline-flex flex-col items-center justify-center text-center gap-2 p-1 pb-2 select-none"
            href={{
              pathname,
              query: restCategory,
            }}
          >
            <div className="size-16 bg-gray-400/20 p-3 rounded-lg flex items-center justify-center">
              <LayoutGrid className="size-full" strokeWidth={1} />
            </div>
            <span className="leading-none grow">{t("allCategories")}</span>
          </Link>
        </CarouselItem>
        {categories.map((category, i) => (
          <CarouselItem
            key={i}
            className="basis-36/100 md:basis-20/100 lg:basis-15/100 min-w-fit"
          >
            <Fragment key={i}>
              <Link
                className="shrink-0 w-32 inline-flex flex-col items-center justify-center text-center gap-2 p-1 pb-2 select-none"
                href={{
                  pathname,
                  query: {
                    ...Object.fromEntries(searchParams.entries()),
                    category: category.slug,
                  },
                }}
              >
                <Image
                  src={category.icon.url}
                  alt={category.icon.alternativeText || category.name}
                  width={60}
                  height={60}
                  className="size-16 bg-gray-400/20 p-3 rounded-lg"
                  priority
                />
                <span className="leading-none grow">{category.name}</span>
              </Link>
            </Fragment>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

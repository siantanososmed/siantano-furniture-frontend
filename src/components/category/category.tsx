"use client";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ChevronRightIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { createGridPages } from "@/lib/utils";
import { useGridColumns } from "@/hooks/use-grid-columns";
import { useTranslations } from "next-intl";

export default function Category({
  categories,
}: {
  categories: CategoryDto[];
}) {
  const search = useSearchParams();
  const { ref, cols } = useGridColumns();
  const t = useTranslations("Home");
  const type =
    search.get("type")?.toLowerCase() === "local" ? "local" : "export";

  return (
    <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 mt-3">
      <div className="inline-flex justify-between w-full items-center">
        <span className="text-3xl font-semibold">{t("catalog")}</span>
        <Link
          href={"/catalog/" + type}
          className="inline-flex flex-row items-end gap-1 text-sm font-medium text-primary hover:underline cursor-pointer"
        >
          {t("seeMore")} <ChevronRightIcon className="size-4" />
        </Link>
      </div>

      {/*mobile*/}
      <Carousel opts={{ dragFree: true }} className="w-full">
        <CarouselContent className="w-full">
          {createGridPages(categories, cols, 1).map((page, index) => (
            <CarouselItem key={index}>
              <div
                ref={index === 0 ? ref : null}
                className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 grid-rows-1 gap-3"
              >
                {page.map((category) => (
                  <Link
                    key={category.documentId}
                    className="min-h-28 min-w-36 inline-flex flex-col items-center justify-center text-center gap-2 p-2 select-none"
                    href={{
                      pathname: `/catalog/${type}`,
                      query: {
                        category: category.slug,
                      },
                    }}
                  >
                    <Image
                      src={category.icon.url}
                      alt={category.icon.alternativeText || category.name}
                      width={60}
                      height={60}
                      className="size-14"
                      priority
                    />
                    <span className="leading-none grow font-bold">
                      {category.name}
                    </span>
                  </Link>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/*/!*tablet*!/*/}
      {/*<Carousel*/}
      {/*  opts={{ dragFree: true }}*/}
      {/*  className="hidden md:block lg:hidden w-full"*/}
      {/*>*/}
      {/*  <CarouselContent className="w-full">*/}
      {/*    {createGridPages(categories, 4, 2).map((page, index) => (*/}
      {/*      <CarouselItem key={index}>*/}
      {/*        <div className="w-full grid grid-cols-4 grid-rows-2 gap-3">*/}
      {/*          {page.map((category) => (*/}
      {/*            <Link*/}
      {/*              key={category.documentId}*/}
      {/*              className="min-h-28 min-w-36 inline-flex flex-col items-center justify-center text-center gap-2 p-2 select-none"*/}
      {/*              href={{*/}
      {/*                pathname: `/category/${type}`,*/}
      {/*                query: {*/}
      {/*                  category: category.slug,*/}
      {/*                },*/}
      {/*              }}*/}
      {/*            >*/}
      {/*              <Image*/}
      {/*                src={getCldImageUrl({*/}
      {/*                  src: category.icon.url,*/}
      {/*                  width: 60,*/}
      {/*                  height: 60,*/}
      {/*                })}*/}
      {/*                alt={category.icon.alternativeText || category.name}*/}
      {/*                width={60}*/}
      {/*                height={60}*/}
      {/*                className="size-14"*/}
      {/*              />*/}
      {/*              <span className="leading-none grow font-bold">*/}
      {/*                {category.name}*/}
      {/*              </span>*/}
      {/*            </Link>*/}
      {/*          ))}*/}
      {/*        </div>*/}
      {/*      </CarouselItem>*/}
      {/*    ))}*/}
      {/*  </CarouselContent>*/}
      {/*</Carousel>*/}

      {/*/!*desktop*!/*/}
      {/*<Carousel opts={{ dragFree: true }} className="hidden lg:block w-full">*/}
      {/*  <CarouselContent className="w-full">*/}
      {/*    {createGridPages(categories, 6, 2).map((page, index) => (*/}
      {/*      <CarouselItem key={index}>*/}
      {/*        <div className="w-full grid grid-cols-6 grid-rows-2 gap-3">*/}
      {/*          {page.map((category) => (*/}
      {/*            <Link*/}
      {/*              key={category.documentId}*/}
      {/*              className="min-h-28 min-w-36 inline-flex flex-col items-center justify-center text-center gap-2 p-2 select-none"*/}
      {/*              href={{*/}
      {/*                pathname: `/category/${type}`,*/}
      {/*                query: {*/}
      {/*                  category: category.slug,*/}
      {/*                },*/}
      {/*              }}*/}
      {/*            >*/}
      {/*              <Image*/}
      {/*                src={getCldImageUrl({*/}
      {/*                  src: category.icon.url,*/}
      {/*                  width: 60,*/}
      {/*                  height: 60,*/}
      {/*                })}*/}
      {/*                alt={category.icon.alternativeText || category.name}*/}
      {/*                width={60}*/}
      {/*                height={60}*/}
      {/*                className="size-14"*/}
      {/*              />*/}
      {/*              <span className="leading-none grow font-bold">*/}
      {/*                {category.name}*/}
      {/*              </span>*/}
      {/*            </Link>*/}
      {/*          ))}*/}
      {/*        </div>*/}
      {/*      </CarouselItem>*/}
      {/*    ))}*/}
      {/*  </CarouselContent>*/}
      {/*</Carousel>*/}
    </section>
  );
}

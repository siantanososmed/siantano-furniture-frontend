"use client";
import { useGridColumns } from "@/hooks/use-grid-columns";
import { useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { createGridPages } from "@/lib/utils";
import NewArrivalCard from "@/components/new-arrivals/new-arrival-card";

export default function NewArrival({ products }: { products: ProductDto[] }) {
  const { ref, cols } = useGridColumns();
  const t = useTranslations("Home");

  return (
    <section
      data-aos="fade-down"
      className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 my-6"
    >
      <div className="text-3xl font-semibold">{t("newArrivals")}</div>
      <Carousel className="group">
        <CarouselContent>
          {createGridPages<ProductDto>(products, cols, 1).map((page, index) => (
            <CarouselItem key={index}>
              <div
                ref={index === 0 ? ref : null}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 p-4"
              >
                {page.map((product, i) => (
                  <NewArrivalCard
                    index={i}
                    key={product.documentId}
                    href={"product/" + product.slug}
                    title={product.name}
                    image={"http://localhost:1337" + product.thumbnail.url}
                    imageAlt={product.thumbnail.alternativeText || product.name}
                  />
                ))}
              </div>
            </CarouselItem>
          ))}
          {/*{createGridPages(Array.from({ length: 12 }), cols, 1).map(*/}
          {/*  (page, index) => (*/}
          {/*    <CarouselItem key={index}>*/}
          {/*      <div*/}
          {/*        ref={index === 0 ? ref : null}*/}
          {/*        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 p-4"*/}
          {/*      >*/}
          {/*        {page.map((_, i) => (*/}
          {/*          <RecommendedProductCard*/}
          {/*            href={"product/" + i}*/}
          {/*            key={i + index * cols}*/}
          {/*            title={i.toString()}*/}
          {/*            image={""}*/}
          {/*            imageAlt={""}*/}
          {/*          />*/}
          {/*        ))}*/}
          {/*      </div>*/}
          {/*    </CarouselItem>*/}
          {/*  )*/}
          {/*)}*/}
          {/*<CarouselItem>*/}
          {/*  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-4">*/}
          {/*    {Array.from({ length: 4 }).map((_, i) => (*/}
          {/*      <RecommendedProductCard*/}
          {/*        href={"#"}*/}
          {/*        key={i}*/}
          {/*        title={"Products " + (i + 1)}*/}
          {/*        image={""}*/}
          {/*        imageAlt={""}*/}
          {/*      />*/}
          {/*    ))}*/}
          {/*  </div>*/}
          {/*</CarouselItem>*/}
          {/*<CarouselItem>*/}
          {/*  <div className="grid grid-cols-4 gap-5 p-4">*/}
          {/*    {Array.from({ length: 4 }).map((_, i) => (*/}
          {/*      <RecommendedProductCard*/}
          {/*        href={"#"}*/}
          {/*        key={i}*/}
          {/*        title={"Products " + (i + 1)}*/}
          {/*        image={""}*/}
          {/*        imageAlt={""}*/}
          {/*      />*/}
          {/*    ))}*/}
          {/*  </div>*/}
          {/*</CarouselItem>*/}
        </CarouselContent>
        <CarouselPrevious className="left-2 !invisible group-hover:!visible transition-all" />
        <CarouselNext className="right-2 !invisible group-hover:!visible transition-all" />
      </Carousel>
    </section>
  );
}

"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import RecommendedProductCard from "@/components/recommended-products/recommended-product-card";
import { createGridPages } from "@/lib/utils";
import { useGridColumns } from "@/hooks/use-grid-columns";

export default function RecommendedProducts({
  products,
}: {
  products: ProductDto[];
}) {
  const { ref, cols } = useGridColumns();

  return (
    <section className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 space-y-6 my-6">
      <div className="text-3xl font-semibold">Recommended Products</div>
      <Carousel>
        <CarouselContent>
          {createGridPages(products, cols, 1).map((page, index) => (
            <CarouselItem key={index}>
              <div
                ref={index === 0 ? ref : null}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-4"
              >
                {page.map((product) => (
                  <RecommendedProductCard
                    href={"product/" + product.slug}
                    key={product.documentId}
                    title={product.name}
                    image={product.thumbnail.url}
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
        <div className="w-0 h-16 relative mr-16 ml-auto">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </section>
  );
}

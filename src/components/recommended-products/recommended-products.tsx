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
import { useTranslations } from "next-intl";

export default function RecommendedProducts({
  products,
}: {
  products: ProductDto[];
}) {
  const { ref, cols } = useGridColumns();
  const t = useTranslations("Home");

  return (
    <section
      data-aos="fade-down"
      className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 my-6"
    >
      <div className="text-3xl font-semibold">{t("recommendedProducts")}</div>
      <Carousel className="group">
        <CarouselContent>
          {createGridPages(products, cols, 1).map((page, index) => (
            <CarouselItem key={index}>
              <div
                ref={index === 0 ? ref : null}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 p-4"
              >
                {page.map((product, i) => (
                  <RecommendedProductCard
                    index={i}
                    href={"product/" + product.slug}
                    key={product.documentId}
                    title={product.name}
                    image={product.thumbnail.url}
                    imageAlt={product.thumbnail.alternativeText || product.name}
                    hoverImage={product.product_colors?.[0]?.productMedia?.[0]?.url}
                    hoverImageAlt={product.product_colors?.[0]?.productMedia?.[0]?.alternativeText}
                  />
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 !invisible group-hover:!visible transition-all" />
        <CarouselNext className="right-2 !invisible group-hover:!visible transition-all" />
      </Carousel>
    </section>
  );
}

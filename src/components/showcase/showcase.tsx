"use client";
import ShowcaseHotspot from "@/components/showcase/showcase-hotspot";
import ShowcaseImage from "@/components/showcase/showcase-image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useTranslations } from "next-intl";

export default function Showcase({
  showcases,
}: {
  showcases: ShowcaseImageDto[];
}) {
  const t = useTranslations("Home");
  return (
    <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 my-6">
      <div className="text-3xl font-semibold">{t("showcases")}</div>
      <div className="group">
        <Carousel>
          <CarouselContent>
            {showcases.map((showcase) => (
              <CarouselItem key={showcase.documentId}>
                <div className="grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] place-items-start overflow-hidden">
                  <ShowcaseImage
                    imageUrl={showcase.image.url}
                    imageAlt={showcase.image.alternativeText || showcase.name}
                  />
                  {showcase.showcase_points.map((hotspot) => (
                    <ShowcaseHotspot
                      key={hotspot.documentId}
                      rowStart={hotspot.row}
                      rowEnd={hotspot.row + 1}
                      colStart={hotspot.column}
                      colEnd={hotspot.column + 1}
                      title={hotspot.product.name}
                      slug={hotspot.product.slug}
                      thumbnailAlt={
                        hotspot.product.thumbnail.alternativeText ||
                        hotspot.product.name
                      }
                      thumbnailUrl={hotspot.product.thumbnail.url}
                    />
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 !invisible group-hover:!visible transition-all" />
          <CarouselNext className="right-2 !invisible group-hover:!visible transition-all" />
        </Carousel>
      </div>
    </section>
  );
}

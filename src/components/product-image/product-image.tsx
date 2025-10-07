"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";

// const data = [
//   {
//     id: 1,
//     type: "image",
//     src: "https://placehold.jp/3d4070/ffffff/300x400.png",
//     alt: "Product Image 1",
//   },
//   {
//     id: 2,
//     type: "image",
//     src: "https://placehold.jp/3d4070/ffffff/500x500.png",
//     alt: "Product Image 2",
//   },
//   {
//     id: 3,
//     type: "image",
//     src: "https://placehold.jp/3d4070/ffffff/300x300.png",
//     alt: "Product Image 3",
//   },
//   {
//     id: 4,
//     type: "image",
//     src: "https://placehold.jp/3d4070/ffffff/200x200.png",
//     alt: "Product Image 4",
//   },
//   {
//     id: 5,
//     type: "image",
//     src: "https://placehold.jp/3d4070/ffffff/100x100.png",
//     alt: "Product Image 4",
//   },
// ];

type ProductImageProps = {
  data: MediaDto[];
};

export default function ProductImage({ data }: ProductImageProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState<number>();

  const mobileContainerRef = useRef<HTMLDivElement | null>(null);
  const mobileThumbRefs = useRef<Array<HTMLDivElement | null>>([]);

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  const isVisible = (el: HTMLElement | null) =>
    !!el && el.offsetParent !== null && el.clientWidth > 0;

  // scroll helper: center the thumb inside container
  const scrollThumbIntoView = (
    container: HTMLDivElement,
    thumb: HTMLDivElement
  ) => {
    if (!container || !thumb) return;
    // schedule a frame to ensure layout settled (images, etc.)
    requestAnimationFrame(() => {
      const containerRect = container.getBoundingClientRect();
      const thumbRect = thumb.getBoundingClientRect();

      // compute thumb left relative to container scroll
      const relativeLeft =
        thumbRect.left - containerRect.left + container.scrollLeft;

      // center the thumb
      const targetLeft = Math.max(
        0,
        relativeLeft - (container.clientWidth - thumb.clientWidth) / 2
      );

      container.scrollTo({ left: targetLeft, behavior: "smooth" });
    });
  };

  useEffect(() => {
    if (selectedIndex == null) return;

    const tryScroll = (attempt = 0) => {
      // prefer mobile if visible, otherwise desktop
      const mobileContainer = mobileContainerRef.current;

      if (isVisible(mobileContainer)) {
        const thumb = mobileThumbRefs.current[selectedIndex];
        if (thumb) return scrollThumbIntoView(mobileContainer!, thumb);
      }

      // if neither container is visible yet (e.g. layout not ready), retry once shortly
      if (attempt < 3) {
        setTimeout(() => tryScroll(attempt + 1), 40);
      }
    };

    tryScroll();
  }, [selectedIndex]);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <div className="space-y-3 md:max-w-64 lg:max-w-[450px]">
      <div className="size-full md:size-64 lg:size-[450px] aspect-square group">
        <Carousel
          setApi={setApi}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {data.map((item) => (
              <CarouselItem key={item.id}>
                <div className="size-full aspect-square md:size-64 lg:size-[450px] flex items-center justify-center border shadow p-0.5">
                  <Image
                    src={item.url}
                    alt={item.alternativeText || "Product Image"}
                    width={1000}
                    height={1000}
                    className="max-w-full max-h-full object-contain"
                    priority={true}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 !invisible group-hover:!visible transition-all" />
          <CarouselNext className="right-2 !invisible group-hover:!visible transition-all" />
        </Carousel>
      </div>

      <div className="hidden md:grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {data.map((item, i) => (
          <div
            role="tablist"
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              "w-full aspect-square p-1",
              i === selectedIndex && "border border-black"
            )}
          >
            <Image
              src={item.url}
              alt={item.alternativeText || "Product Image"}
              width={100}
              height={100}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        ))}
      </div>

      <div
        ref={mobileContainerRef}
        className="flex flex-row overflow-x-auto gap-3 pb-2 scrollbar-categories md:hidden"
      >
        {data.map((item, i) => (
          <div
            role="tablist"
            key={i}
            ref={(el) => {
              mobileThumbRefs.current[i] = el;
            }}
            onClick={() => api?.scrollTo(i)}
            style={{
              scrollbarGutter: "stable",
            }}
            className={cn(
              "w-24 shrink-0 aspect-square p-1",
              i === selectedIndex && "border border-black"
            )}
          >
            <Image
              src={item.url}
              alt={item.alternativeText || "Product Image"}
              width={100}
              height={100}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
}

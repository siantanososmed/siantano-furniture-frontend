"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { productsQueryOptions } from "@/components/products/products-query-options";
import { useLocale } from "next-intl";
import { useInView } from "react-intersection-observer";
import { useEffect, useMemo } from "react";
import ProductCard from "@/components/products/product-card";
import { useSearchParams } from "next/navigation";

export default function ProductsGrid() {
  const locale = useLocale();
  const query = useSearchParams();
  const colorsQueries = query.getAll("colors");
  const materialsQueries = query.getAll("materials");
  const finishesQueries = query.getAll("finishes");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      productsQueryOptions({
        locale,
        filter: {
          category: query.get("category") || undefined,
          color: colorsQueries.length > 0 ? colorsQueries : undefined,
          material: materialsQueries.length > 0 ? materialsQueries : undefined,
          finish: finishesQueries.length > 0 ? finishesQueries : undefined,
        },
      })
    );

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const products = useMemo(
    () => data?.pages.flatMap((page) => page.data) || [],
    [data]
  );

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {products.map((product, i, arr) => (
          <ProductCard
            index={i}
            key={product.documentId}
            product={product}
            ref={i === arr.length - 1 ? ref : null}
          />
        ))}
        {/*<Link*/}
        {/*  href={"#"}*/}
        {/*  className="w-full min-h-52 border rounded-lg overflow-hidden flex flex-col items-center justify-center shadow gap-1 hover:scale-105 transition"*/}
        {/*>*/}
        {/*  <Image*/}
        {/*    src={"https://placehold.jp/3d4070/ffffff/150x150.png"}*/}
        {/*    alt={""}*/}
        {/*    width={100}*/}
        {/*    height={100}*/}
        {/*    className="w-full object-contain"*/}
        {/*  />*/}
        {/*  <span className="font-bold grow text-center">*/}
        {/*    Lorem ipsum dolor. Lorem ipsum dolor.*/}
        {/*  </span>*/}
        {/*</Link>*/}
        {/*<Link*/}
        {/*  href={"#"}*/}
        {/*  className="w-full min-h-52 border rounded-lg overflow-hidden flex flex-col items-center justify-center shadow gap-1 hover:scale-105 transition"*/}
        {/*>*/}
        {/*  <Image*/}
        {/*    src={"https://placehold.jp/3d4070/ffffff/150x150.png"}*/}
        {/*    alt={""}*/}
        {/*    width={100}*/}
        {/*    height={100}*/}
        {/*    className="w-full object-contain"*/}
        {/*  />*/}
        {/*  <span className="font-bold grow text-center">Lorem ipsum dolor.</span>*/}
        {/*</Link>*/}
        {isFetchingNextPage &&
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="w-full min-h-52 border rounded-lg bg-gray-400 animate-pulse"
            ></div>
          ))}
      </div>
    </>
  );
}

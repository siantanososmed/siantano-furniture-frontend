import Hero from "@/components/hero/hero";
import RecommendedProducts from "@/components/recommended-products/recommended-products";
import Showcase from "@/components/showcase/showcase";
import { getLocale } from "next-intl/server";
import Category from "@/components/category/category";
import {
  getCategories,
  getHero,
  getRecommendedProducts,
  getShowcase,
} from "@/actions/action";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const locale = await getLocale();
  const { type } = await searchParams;

  const [
    categoriesPromise,
    heroPromise,
    recommendedProductsPromise,
    showcasePromise,
  ] = await Promise.allSettled([
    getCategories({ locale, quality: type }),
    getHero({ locale }),
    getRecommendedProducts({ locale }),
    getShowcase({ locale }),
  ]);

  const categories =
    categoriesPromise.status === "fulfilled" ? categoriesPromise.value : null;
  const hero = heroPromise.status === "fulfilled" ? heroPromise.value : null;
  const recommendedProducts =
    recommendedProductsPromise.status === "fulfilled"
      ? recommendedProductsPromise.value
      : null;
  const showcase =
    showcasePromise.status === "fulfilled" ? showcasePromise.value : null;

  return (
    <>
      <Hero
        title={hero?.data.title}
        description={hero?.data.description}
        videoUrl={hero?.data.media.url}
      />
      <Category categories={categories?.data || []} />
      <RecommendedProducts
        products={recommendedProducts?.data.products || []}
      />
      <Showcase showcases={showcase?.data || []} />
    </>
  );
}

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
import { getFulfilledValue } from "@/lib/utils";

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

  const categories = getFulfilledValue(categoriesPromise, "home.categories");
  const hero = getFulfilledValue(heroPromise, "home.hero");
  const recommendedProducts = getFulfilledValue(
    recommendedProductsPromise,
    "home.recommendedProducts"
  );
  const showcase = getFulfilledValue(showcasePromise, "home.showcaseImages");

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

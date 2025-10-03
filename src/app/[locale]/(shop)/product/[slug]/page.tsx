import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProductImage from "@/components/product-image/product-image";
import { getLocale, getTranslations } from "next-intl/server";
import ProductColorSelector from "@/components/color-selector/product-color-selector";
import { getProduct } from "@/actions/action";

export default async function ProductDetail({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ color: string }>;
}) {
  const { slug } = await params;
  const { color } = await searchParams;
  const locale = await getLocale();
  const t = await getTranslations("Product");
  const [productPromise] = await Promise.allSettled([
    getProduct({ slug: slug, locale }),
  ]);

  const product =
    productPromise.status === "fulfilled" ? productPromise.value.data : null;

  if (!product) {
    return <div className="text-center py-10">{t("productNotFound")}</div>;
  }

  const selectedColor =
    product.product_colors.find((el) => el.color.slug === color) ||
    product.product_colors[0];

  return (
    <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 mt-3">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="block md:hidden space-y-3">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="font-bold text-muted-foreground">
            {t("category")} : {product.category.name} (
            {t(`quality.${product.category.quality.toLowerCase()}`)})
          </div>
        </div>

        <ProductImage data={selectedColor.productMedia} />

        <div className="grow space-y-3">
          <div className="hidden md:block space-y-3">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="font-bold text-muted-foreground">
              {t("category")} : {product.category.name} (
              {t(`quality.${product.category.quality.toLowerCase()}`)})
            </div>
          </div>

          <ProductColorSelector
            colors={product.product_colors}
            selectedColor={selectedColor}
          />

          <div
            className="space-y-3 min-h-80 ckeditor-content ckeditor-result"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
          <div className="space-y-3">
            <span className="font-semibold">{t("material")}:</span>
            <div>
              {product.materials.map((material) => material.name).join(", ")}
            </div>
          </div>
          <div>
            <span className="font-semibold">{t("finish")}:</span>
            <div>
              {product.finishings.map((finishing) => finishing.name).join(", ")}
            </div>
          </div>
          <Accordion type="multiple">
            <AccordionItem value="dimension">
              <AccordionTrigger className="text-base font-semibold">
                {t("dimensions")}
              </AccordionTrigger>
              <AccordionContent>
                <div
                  className="ck-content ckeditor-result"
                  dangerouslySetInnerHTML={{ __html: product.dimension }}
                ></div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="weight">
              <AccordionTrigger className="text-base font-semibold">
                {t("weight")}
              </AccordionTrigger>
              <AccordionContent>
                <div
                  className="ck-content ckeditor-result"
                  dangerouslySetInnerHTML={{ __html: product.weight }}
                ></div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}

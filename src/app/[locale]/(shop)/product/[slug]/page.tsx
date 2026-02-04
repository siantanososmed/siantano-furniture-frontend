import { Metadata } from "next";
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
import { getFulfilledValue } from "@/lib/utils";
import DOMPurify from "isomorphic-dompurify";
import {
  generateProductMetadata,
  generateProductSchema,
  generateBreadcrumbSchema,
  SITE_CONFIG,
  type LocaleType,
} from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = (await getLocale()) as LocaleType;

  try {
    const productResponse = await getProduct({ slug, locale });
    const product = productResponse?.data;

    if (!product) {
      return {
        title: "Product Not Found",
        robots: { index: false, follow: false },
      };
    }

    return generateProductMetadata(product, locale);
  } catch {
    return {
      title: "Product Not Found",
      robots: { index: false, follow: false },
    };
  }
}

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

  const product = getFulfilledValue(productPromise, "product.product")?.data;

  if (!product) {
    return <div className="text-center py-10">{t("productNotFound")}</div>;
  }

  const selectedColor =
    product.product_colors.find((el) => el.color.slug === color) ||
    product.product_colors[0];

  // Generate JSON-LD schemas for SEO
  const productSchema = generateProductSchema(product, locale);
  const breadcrumbSchema = generateBreadcrumbSchema([
    {
      name: "Home",
      url: `${SITE_CONFIG.baseUrl}${locale === "id" ? "" : `/${locale}`}`,
    },
    {
      name:
        product.category?.quality === "export"
          ? "Export Products"
          : "Local Products",
      url: `${SITE_CONFIG.baseUrl}${locale === "id" ? "" : `/${locale}`}/catalog/${product.category?.quality?.toLowerCase() || "local"}`,
    },
    {
      name: product.category?.name || "",
      url: `${SITE_CONFIG.baseUrl}${locale === "id" ? "" : `/${locale}`}/catalog/${product.category?.quality?.toLowerCase() || "local"}`,
    },
    {
      name: product.name,
      url: `${SITE_CONFIG.baseUrl}${locale === "id" ? "" : `/${locale}`}/product/${product.slug}`,
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 mt-3">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="block md:hidden space-y-3">
          <h1 data-aos="fade-down" className="text-3xl font-bold">
            {product.name}
          </h1>
          <div data-aos="fade-down" className="font-bold text-muted-foreground">
            {t("category")} : {product.category?.name} (
            {t(`quality.${product.category?.quality?.toLowerCase()}`)})
          </div>
        </div>

        <ProductImage data={selectedColor?.productMedia || []} />

        <div className="grow space-y-3">
          <div className="hidden md:block space-y-3">
            <h1 data-aos="fade-down" className="text-3xl font-bold">
              {product.name}
            </h1>
            <div
              data-aos="fade-down"
              className="font-bold text-muted-foreground"
            >
              {t("category")} : {product.category?.name} (
              {t(`quality.${product.category?.quality?.toLowerCase()}`)})
            </div>
          </div>

          <ProductColorSelector
            colors={product?.product_colors || []}
            selectedColor={selectedColor}
          />

          <div
            data-aos="fade-down"
            className="space-y-3 ckeditor-content ckeditor-result"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product.description),
            }}
          ></div>
          <div data-aos="fade-down" className="space-y-3">
            <span className="font-semibold">{t("material")}:</span>
            <div>
              {product.materials.map((material) => material.name).join(", ")}
            </div>
          </div>
          <div data-aos="fade-down">
            <span className="font-semibold">{t("finish")}:</span>
            <div>
              {product.finishings.map((finishing) => finishing.name).join(", ")}
            </div>
          </div>
          <Accordion type="multiple">
            <AccordionItem data-aos="fade-left" value="dimension">
              <AccordionTrigger className="text-base font-semibold">
                {t("dimensions")}
              </AccordionTrigger>
              <AccordionContent>
                <div
                  className="ck-content ckeditor-result"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(product.dimension),
                  }}
                ></div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem data-aos="fade-right" value="weight">
              <AccordionTrigger className="text-base font-semibold">
                {t("weight")}
              </AccordionTrigger>
              <AccordionContent>
                <div
                  className="ck-content ckeditor-result"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(product.weight),
                  }}
                ></div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
    </>
  );
}

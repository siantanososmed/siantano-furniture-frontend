import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProductImage from "@/components/product-image/product-image";
import { getLocale } from "next-intl/server";
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

  const { data: product } = await getProduct({ slug: slug, locale });

  const selectedColor =
    product.product_colors.find((el) => el.color.slug === color) ||
    product.product_colors[0];

  return (
    <section className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 space-y-6 mt-3">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="block md:hidden space-y-3">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="font-bold text-muted-foreground">
            Category : {product.category.name} ({product.category.quality})
          </div>
        </div>

        <ProductImage data={selectedColor.productMedia} />

        <div className="grow space-y-3">
          <div className="hidden md:block space-y-3">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="font-bold text-muted-foreground">
              Category : {product.category.name} ({product.category.quality})
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
            <span className="font-semibold">Material:</span>
            <div>
              {product.materials.map((material) => material.name).join(", ")}
            </div>
          </div>
          <div>
            <span className="font-semibold">Finish:</span>
            <div>
              {product.finishings.map((finishing) => finishing.name).join(", ")}
            </div>
          </div>
          <Accordion type="multiple">
            <AccordionItem value="dimension">
              <AccordionTrigger className="text-base font-semibold">
                Dimension
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
                Weight
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

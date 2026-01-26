import { memo, Ref } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

const ProductCard = memo(
  ({
    product,
    ref,
    index,
  }: {
    product: ProductDto;
    ref?: Ref<HTMLAnchorElement>;
    index: number;
  }) => {
    // Get the first product photo from product_colors
    const firstProductPhoto =
      product.product_colors?.[0]?.productMedia?.[0]?.url;

    return (
      <Link
        data-aos="fade-up"
        data-aos-delay={(index % 5) * 75}
        ref={ref}
        key={product.documentId}
        href={`/product/${product.slug}`}
        className="group/card w-full min-h-52 border rounded-lg overflow-hidden flex flex-col items-center justify-center shadow hover:scale-105 transition"
      >
        <div className="relative w-full aspect-square overflow-hidden">
          <Image
            src={product.thumbnail.url}
            priority
            alt={product.thumbnail.alternativeText || product.name}
            width={600}
            height={600}
            className="w-full h-full object-cover absolute inset-0 transition-opacity duration-300 group-hover/card:opacity-0"
          />
          {firstProductPhoto && (
            <Image
              src={firstProductPhoto}
              alt={
                product.product_colors?.[0]?.productMedia?.[0]
                  ?.alternativeText || `${product.name} - Product Photo`
              }
              width={600}
              height={600}
              className="w-full h-full object-cover absolute inset-0 transition-opacity duration-300 opacity-0 group-hover/card:opacity-100"
            />
          )}
        </div>
        <span className="font-bold grow text-center self-center w-full min-h-10 p-2">
          {product.name}
        </span>
      </Link>
    );
  }
);
ProductCard.displayName = "ProductCard";
export default ProductCard;

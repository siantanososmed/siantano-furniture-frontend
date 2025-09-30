import { memo, Ref } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

const ProductCard = memo(
  ({ product, ref }: { product: ProductDto; ref?: Ref<HTMLAnchorElement> }) => (
    <Link
      ref={ref}
      key={product.documentId}
      href={`/product/${product.slug}`}
      className="w-full min-h-52 border rounded-lg overflow-hidden flex flex-col items-center justify-center shadow hover:scale-105 transition"
    >
      <Image
        src={product.thumbnail.url}
        priority
        alt={product.thumbnail.alternativeText || product.name}
        width={600}
        height={600}
        className="w-full aspect-square object-cover"
      />
      <span className="font-bold grow text-center self-center w-full min-h-10 p-2">
        {product.name}
      </span>
    </Link>
  )
);
ProductCard.displayName = "ProductCard";
export default ProductCard;

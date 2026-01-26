import { Link } from "@/i18n/navigation";
import Image from "next/image";

type RecommendedProductCardProps = {
  href: string;
  image: string;
  imageAlt: string;
  hoverImage?: string;
  hoverImageAlt?: string;
  title: string;
  index: number;
};

export default function RecommendedProductCard({
  href,
  image,
  imageAlt,
  hoverImage,
  hoverImageAlt,
  title,
  index,
}: RecommendedProductCardProps) {
  return (
    <Link
      data-aos="fade-left"
      data-aos-delay={index * 100}
      href={href}
      className="group/card border overflow-hidden hover:scale-105 transition rounded-xl shadow flex flex-col items-center justify-center"
    >
      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          width={800}
          height={800}
          className="object-cover w-full h-full absolute inset-0 transition-opacity duration-300 group-hover/card:opacity-0"
          priority
        />
        {hoverImage && (
          <Image
            src={hoverImage}
            alt={hoverImageAlt || `${title} - Product Photo`}
            width={800}
            height={800}
            className="object-cover w-full h-full absolute inset-0 transition-opacity duration-300 opacity-0 group-hover/card:opacity-100"
          />
        )}
      </div>
      <div className="p-4 w-full text-lg font-semibold self-start grow">
        {title}
      </div>
    </Link>
  );
}

import { Link } from "@/i18n/navigation";
import Image from "next/image";

type RecommendedProductCardProps = {
  href: string;
  image: string;
  imageAlt: string;
  title: string;
};

export default function RecommendedProductCard({
  href,
  image,
  imageAlt,
  title,
}: RecommendedProductCardProps) {
  return (
    <Link
      href={href}
      className="border overflow-hidden hover:scale-105 transition rounded-xl shadow flex flex-col items-center justify-center"
    >
      <div className="w-full aspect-square transition">
        <Image
          src={image}
          alt={imageAlt}
          width={800}
          height={800}
          className="object-cover w-full h-full"
          priority
        />
      </div>
      <div className="p-4 w-full text-lg font-semibold self-start grow">
        {title}
      </div>
    </Link>
  );
}

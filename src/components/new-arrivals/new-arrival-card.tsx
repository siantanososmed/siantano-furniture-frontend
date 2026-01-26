"use client";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

type NewArrivalCardProps = {
  href: string;
  image: string;
  imageAlt: string;
  hoverImage?: string;
  hoverImageAlt?: string;
  title: string;
  index: number;
};

export default function NewArrivalCard({
  href,
  image,
  imageAlt,
  hoverImage,
  hoverImageAlt,
  title,
  index,
}: NewArrivalCardProps) {
  const t = useTranslations("Home");

  return (
    <Link
      data-aos="fade-left"
      data-aos-delay={index * 100}
      href={href}
      className="group/card border overflow-hidden hover:scale-105 transition rounded-xl shadow flex relative flex-col items-center justify-center"
    >
      <div className="absolute right-2 top-1 z-10">
        <Badge className="border-transparent bg-gradient-to-r from-[#0057A6] to-[#00C6FF] [background-size:105%] bg-center text-white rounded-full">
          {t("new")}
        </Badge>
      </div>
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

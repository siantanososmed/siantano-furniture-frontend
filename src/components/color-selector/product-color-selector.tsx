"use client";

import Image from "next/image";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { cn, queryUrlToObject } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function ProductColorSelector({
  colors,
  selectedColor,
}: {
  colors: ProductColorDto[];
  selectedColor?: ProductColorDto;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const t = useTranslations("Product");

  const handleColorChange = (colorSlug: string) => {
    router.push({
      pathname,
      query: {
        ...queryUrlToObject(searchParams),
        color: colorSlug,
      },
    });
  };

  return (
    <div className="space-y-2">
      <div data-aos="fade-down" className="block">
        {t("color")}:{" "}
        <span className="font-semibold">{selectedColor?.color.name}</span>
      </div>
      <div className="flex flex-row flex-wrap gap-5">
        {colors.map((color, i) => (
          <button
            data-aos="fade-left"
            data-aos-delay={i * 100}
            key={color.documentId}
            className={cn(
              "size-16 hover:scale-105 transition cursor-pointer",
              selectedColor?.color.slug === color.color.slug &&
                "border border-black"
            )}
            onClick={() => handleColorChange(color.color.slug)}
          >
            <div className="size-full p-1 border">
              <Image
                src={color.color.sample.url}
                alt={color.color.sample.alternativeText || color.color.name}
                width={100}
                height={100}
                className="aspect-square object-cover"
                priority
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Funnel } from "lucide-react";
import CheckboxesWithLabel from "@/components/checkboxes/checkboxes-with-label";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { queryUrlToObject } from "@/lib/utils";
import { useTranslations } from "next-intl";

type FilterProductProps = {
  materials: MaterialDto[];
  colors: ColorDto[];
  finishes: FinishDto[];
};

export default function FilterProduct({
  materials,
  colors,
  finishes,
}: FilterProductProps) {
  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchParams();
  const t = useTranslations("Catalog");

  const handleOnchange = (
    type: "materials" | "finishes" | "colors",
    value: string,
    checked: boolean
  ) => {
    const currentFilters = queryUrlToObject(query);

    let updatedValues: string[];
    if (typeof currentFilters[type] === "string") {
      updatedValues = [currentFilters[type] as string];
    } else if (Array.isArray(currentFilters[type])) {
      updatedValues = currentFilters[type] as string[];
    } else {
      updatedValues = [];
    }

    if (checked) {
      if (!updatedValues.includes(value)) {
        updatedValues = [...updatedValues, value];
      }
    } else {
      updatedValues = updatedValues.filter((v) => v !== value);
    }

    currentFilters[type] = updatedValues;

    // Reset to first page when filters change
    delete currentFilters.page;

    router.push({
      pathname,
      query: currentFilters,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          {t("filter")}
          <Funnel className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="space-y-5 overflow-y-auto max-h-96"
      >
        <div className="space-y-3">
          <div className="font-bold">{t("materials")}</div>
          {materials.map((material) => (
            <CheckboxesWithLabel
              key={material.documentId}
              label={material.name}
              onCheckedChange={(checked) => {
                handleOnchange("materials", material.slug, checked === true);
              }}
              checked={query.has("materials", material.slug)}
            />
          ))}
        </div>
        <div className="space-y-3">
          <div className="font-bold">{t("colors")}</div>
          {colors.map((color) => (
            <CheckboxesWithLabel
              key={color.documentId}
              label={color.name}
              onCheckedChange={(checked) => {
                handleOnchange("colors", color.slug, checked === true);
              }}
              checked={query.has("colors", color.slug)}
            />
          ))}
        </div>
        <div className="space-y-3">
          <div className="font-bold">{t("finishes")}</div>
          {finishes.map((finish) => (
            <CheckboxesWithLabel
              key={finish.documentId}
              label={finish.name}
              onCheckedChange={(checked) => {
                handleOnchange("finishes", finish.slug, checked === true);
              }}
              checked={query.has("finishes", finish.slug)}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

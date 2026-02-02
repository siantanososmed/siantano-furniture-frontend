"use client";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import { useRef } from "react";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { queryUrlToObject } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function CareersSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("Careers");

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const params = {
        ...queryUrlToObject(searchParams),
        query: value,
      } as { [key: string]: string | number | undefined };

      // Reset to first page when searching
      delete params.page;

      if (value === "") {
        delete params.query;
      }

      router.push({
        pathname: "/careers",
        query: params,
      });
    }, 300);
  };

  return (
    <InputGroup>
      <InputGroupInput
        placeholder={t("searchJobs")}
        onChange={(e) => handleChange(e)}
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
}

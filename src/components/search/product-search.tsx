"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import browserHttpClient from "@/lib/client-http";
import { Link, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useDebounce } from "@/hooks/use-debounce";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
} from "@/components/ui/input-group";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type SearchResult = Pick<
  ProductDto,
  "id" | "documentId" | "name" | "slug" | "thumbnail"
>;

async function searchProducts(
  query: string,
  locale: string
): Promise<SearchResult[]> {
  if (!query.trim()) return [];

  const response = await browserHttpClient.get<
    PaginatedResponseDto<SearchResult>
  >(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    params: {
      filters: {
        name: {
          $containsi: query,
        },
      },
      fields: ["name", "slug"],
      populate: {
        thumbnail: {
          fields: ["url", "provider_metadata", "alternativeText"],
        },
      },
      pagination: {
        pageSize: 6,
      },
      locale,
    },
  });

  return response.data.data;
}

function SearchInput({
  onResultClick,
  autoFocus = false,
}: {
  onResultClick?: () => void;
  autoFocus?: boolean;
}) {
  const t = useTranslations("Search");
  const locale = useLocale();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(query, 300);

  const { data: results = [], isLoading } = useQuery({
    queryKey: ["product-search", debouncedQuery, locale],
    queryFn: () => searchProducts(debouncedQuery, locale),
    enabled: debouncedQuery.trim().length > 0,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && results[activeIndex]) {
        // Navigate to selected product
        onResultClick?.();
        router.push(`/product/${results[activeIndex].slug}`);
      } else if (query.trim()) {
        // Navigate to search page with query
        onResultClick?.();
        setIsFocused(false);
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    } else if (e.key === "Escape") {
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  const clearSearch = () => {
    setQuery("");
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  const showResults =
    isFocused && (results.length > 0 || (query.trim() && !isLoading));

  return (
    <div ref={containerRef} className="relative w-full">
      <InputGroup
        className={cn(
          "h-9 rounded-md transition-all duration-200",
          isFocused && "ring-2 ring-ring/50"
        )}
      >
        <InputGroupAddon align="inline-start">
          {isLoading ? (
            <Spinner className="size-4" />
          ) : (
            <Search className="size-4" />
          )}
        </InputGroupAddon>
        <InputGroupInput
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder={t("placeholder")}
          className="h-9 text-sm"
          aria-label={t("ariaLabel")}
          autoComplete="off"
        />
        {query && (
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="icon-xs"
              variant="ghost"
              onClick={clearSearch}
              aria-label={t("clear")}
            >
              <X className="size-3.5" />
            </InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>

      {/* Search Results Dropdown */}
      {showResults && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 py-0 shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150 min-w-64">
          <CardContent className="p-0 max-h-72 overflow-y-auto">
            {results.length > 0 ? (
              <ul className="divide-y divide-border">
                {results.map((product, index) => (
                  <li key={product.documentId}>
                    <Link
                      href={`/product/${product.slug}`}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 hover:bg-accent transition-colors",
                        activeIndex === index && "bg-accent"
                      )}
                      onClick={() => {
                        setIsFocused(false);
                        onResultClick?.();
                      }}
                    >
                      {product.thumbnail?.url ? (
                        <div className="relative size-9 rounded overflow-hidden bg-muted shrink-0">
                          <Image
                            src={product.thumbnail.url}
                            alt={
                              product.thumbnail.alternativeText || product.name
                            }
                            fill
                            className="object-cover"
                            sizes="36px"
                          />
                        </div>
                      ) : (
                        <div className="size-9 rounded bg-muted shrink-0" />
                      )}
                      <span className="text-sm font-medium truncate">
                        {product.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              query.trim() &&
              !isLoading && (
                <div className="px-4 py-5 text-center text-muted-foreground">
                  <Search className="size-6 mx-auto mb-2 opacity-50" />
                  <p className="text-sm font-medium">{t("noResults")}</p>
                  <p className="text-xs mt-0.5">{t("tryDifferent")}</p>
                </div>
              )
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Mobile search with sheet
function MobileSearch() {
  const t = useTranslations("Search");
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="size-9">
          <Search className="size-4" />
          <span className="sr-only">{t("ariaLabel")}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="px-4 pb-6">
        <SheetHeader className="p-0 pt-2">
          <SheetTitle className="sr-only">{t("ariaLabel")}</SheetTitle>
          <SheetDescription className="sr-only">
            {t("placeholder")}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <SearchInput onResultClick={() => setOpen(false)} autoFocus />
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Desktop search
function DesktopSearch() {
  return (
    <div className="w-52">
      <SearchInput />
    </div>
  );
}

export default function ProductSearch() {
  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <DesktopSearch />
      </div>
      {/* Mobile */}
      <div className="md:hidden">
        <MobileSearch />
      </div>
    </>
  );
}

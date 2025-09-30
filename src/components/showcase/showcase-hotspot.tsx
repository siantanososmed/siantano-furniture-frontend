import { Link } from "@/i18n/navigation";
import Image from "next/image";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
} from "@floating-ui/react";

type ShowcaseHotspotProps = {
  rowStart: number;
  rowEnd: number;
  colStart: number;
  colEnd: number;
  title: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  slug: string;
};

export default function ShowcaseHotspot({
  colEnd,
  rowEnd,
  rowStart,
  colStart,
  title,
  thumbnailAlt,
  thumbnailUrl,
  slug,
}: ShowcaseHotspotProps) {
  const { refs, floatingStyles } = useFloating({
    placement: "right", // start from the right side
    middleware: [
      offset(8), // add spacing between pin and tooltip
      flip(), // flip to the opposite side if no space
      shift({ padding: 8 }), // keep tooltip in the viewport
    ],
    whileElementsMounted: autoUpdate,
  });

  return (
    <div
      style={{
        gridColumnStart: colStart,
        gridColumnEnd: colEnd,
        gridRowStart: rowStart,
        gridRowEnd: rowEnd,
      }}
    >
      <div
        ref={refs.setReference}
        className="size-2.5 md:size-3 lg:size-4 showcase-pin group"
        tabIndex={0}
      >
        <Link
          ref={refs.setFloating}
          style={floatingStyles}
          href={`/product/${slug}`}
          className="opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition duration-200"
        >
          <div className="flex flex-row w-48 bg-primary-foreground/90 hover:bg-primary-foreground transition shadow-lg border rounded-xl p-2">
            <Image
              src={thumbnailUrl}
              alt={thumbnailAlt}
              width={150}
              height={150}
              className="rounded-lg aspect-square size-20 object-contain border border-gray-300"
            />
            <div className="grow pl-2 flex flex-col justify-center">
              <p className="text-sm font-medium">{title}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

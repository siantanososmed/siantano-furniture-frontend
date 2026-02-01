"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function PageHero({
  imageUrl,
  title,
  className,
}: {
  imageUrl: string;
  title: string;
  className?: string;
}) {
  return (
    <section className={cn("relative", className)}>
      <div className="w-full h-[300px] md:h-[400px]">
        <Image
          src={imageUrl}
          alt={title}
          fill
          priority
          className="object-cover"
          data-aos="fade-down"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4"
        data-aos="fade-down"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center text-white tracking-tight">
          {title}
        </h1>
      </div>
    </section>
  );
}

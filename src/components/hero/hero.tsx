import { GlobeIcon, MapPinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function Hero({
  videoUrl = "",
  title = "",
  description = "",
}: {
  videoUrl?: string;
  title?: string;
  description?: string;
}) {
  const t = await getTranslations("Home");

  return (
    <>
      <section className="relative">
        <div className="w-full h-[600px]">
          {videoUrl && (
            <video
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              controlsList="nodownload"
              src={videoUrl}
              className="object-cover w-full h-full"
            />
          )}
        </div>
        <div
          className={cn(
            "absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 bg-white/30 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xs shadow border border-white/30",
            "w-full max-w-xs md:max-w-lg lg:max-w-2xl"
          )}
        >
          <div className="overflow-hidden">
            <div className="text-center p-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight">
                {title}
              </h1>
              <p className="mt-6 text-[17px] md:text-lg">{description}</p>
              <div className="mt-12 flex items-center justify-center gap-4">
                <Button size="lg" className="rounded-full text-base" asChild>
                  <Link href={{ pathname: "/", query: { type: "export" } }}>
                    <GlobeIcon className="text-blue-500" />
                    <span className="hidden md:contents">
                      {t("exportProducts.long")}
                    </span>
                    <span className="md:hidden">
                      {t("exportProducts.short")}
                    </span>
                  </Link>
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="rounded-full text-base shadow-none"
                  asChild
                >
                  <Link href={{ pathname: "/", query: { type: "local" } }}>
                    <MapPinIcon className="text-green-500" />
                    <span className="hidden md:contents">
                      {t("localProducts.long")}
                    </span>
                    <span className="md:hidden">
                      {t("localProducts.short")}
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

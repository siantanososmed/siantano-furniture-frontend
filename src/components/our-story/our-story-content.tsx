import Image from "next/image";
import { getTranslations } from "next-intl/server";

const milestones = [
  {
    key: "intro",
    images: ["/our-story (1).jpeg"],
    layout: "text-right" as const,
  },
  {
    key: "1998",
    images: ["/our-story (1).png"],
    layout: "text-left" as const,
  },
  {
    key: "2007",
    images: ["/our-story (3).png"],
    layout: "text-right" as const,
  },
  {
    key: "2009",
    images: ["/our-story (2).jpeg"],
    layout: "text-left" as const,
  },
  {
    key: "present",
    images: ["/our-story (2).png"],
    layout: "text-right" as const,
  },
];

export default async function OurStoryContent() {
  const t = await getTranslations("OurStory");

  return (
    <div className="overflow-x-hidden py-20">
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 md:space-y-0">
          {milestones.map((milestone) => {
            const year =
              milestone.key === "intro"
                ? ""
                : t(`milestones.${milestone.key}.year`);
            const text =
              milestone.key === "intro"
                ? t("intro")
                : t(`milestones.${milestone.key}.text`);
            const isTextLeft = milestone.layout === "text-left";

            const textBlock = (
              <div
                data-aos={isTextLeft ? "fade-right" : "fade-left"}
                className="flex flex-col justify-center h-full"
              >
                {year && (
                  <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-primary leading-none mb-4">
                    {year}
                  </h2>
                )}
                <p className="text-sm md:text-base text-gray-700 leading-relaxed text-justify">
                  {text}
                </p>
              </div>
            );

            const imageBlock = (
              <div
                data-aos={isTextLeft ? "fade-left" : "fade-right"}
                className="space-y-3"
              >
                {milestone.images.map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt={`Siantano ${milestone.key} - ${i + 1}`}
                    width={760}
                    height={
                      milestone.images.length > 1 ? (i === 0 ? 440 : 360) : 570
                    }
                    className="w-full h-auto object-cover"
                  />
                ))}
              </div>
            );

            return (
              <div
                key={milestone.key}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
              >
                <div className={isTextLeft ? "md:order-last" : ""}>
                  {imageBlock}
                </div>
                <div className={isTextLeft ? "md:order-first" : ""}>
                  {textBlock}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

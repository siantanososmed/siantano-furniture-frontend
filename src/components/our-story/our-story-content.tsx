import { getTranslations } from "next-intl/server";
import DOMPurify from "isomorphic-dompurify";

export default async function OurStoryContent({
  story,
}: {
  story?: OurStoryDto;
}) {
  const t = await getTranslations("OurStory");
  return (
    <section
      data-aos="fade-down"
      className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 my-6"
    >
      <div className="text-3xl font-semibold">{t("ourStory")}</div>
      <article
        className="ck-content ckeditor-result"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(story?.content ?? ""),
        }}
      ></article>
    </section>
  );
}

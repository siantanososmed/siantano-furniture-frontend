import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import "@/app/ckeditor5-content.css";
import OurStoryContent from "@/components/our-story/our-story-content";
import CertificatesBanner from "@/components/certificates/certificates-banner";
import { getHeroImage, getOurStory } from "@/actions/action";
import { getFulfilledValue } from "@/lib/utils";
import PageHero from "@/components/hero/page-hero";
import {
  generatePageMetadata,
  getPageSeo,
  type LocaleType,
} from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as LocaleType;
  const seo = getPageSeo("ourStory", locale);

  return generatePageMetadata({
    title: seo?.title || "Our Story",
    description: seo?.description || "",
    locale,
    path: "/our-story",
  });
}

export default async function OurStory() {
  const locale = await getLocale();
  const t = await getTranslations("OurStory");
  const [storyPromise, heroImage] = await Promise.allSettled([
    getOurStory({ locale }),
    getHeroImage(),
  ]);

  const story = getFulfilledValue(storyPromise, "our-story.story");
  const heroImg = getFulfilledValue(heroImage, "our-story.heroImage");

  return (
    <>
      <PageHero
        imageUrl={heroImg?.data?.ourStoryHero?.url || ""}
        title={t("ourStory")}
      />
      <OurStoryContent story={story?.data} />
      <CertificatesBanner story={story?.data} />
    </>
  );
}

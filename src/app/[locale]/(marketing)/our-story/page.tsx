import { getLocale } from "next-intl/server";
import "@/app/ckeditor5-content.css";
import OurStoryContent from "@/components/our-story/our-story-content";
import CertificatesBanner from "@/components/certificates/certificates-banner";
import { getOurStory } from "@/actions/action";
import { getFulfilledValue } from "@/lib/utils";

export default async function OurStory() {
  const locale = await getLocale();
  const [storyPromise] = await Promise.allSettled([getOurStory({ locale })]);

  const story = getFulfilledValue(storyPromise, "our-story.story");

  return (
    <>
      <OurStoryContent story={story?.data} />
      <CertificatesBanner story={story?.data} />
    </>
  );
}

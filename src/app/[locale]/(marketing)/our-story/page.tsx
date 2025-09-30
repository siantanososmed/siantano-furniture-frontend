import { getLocale } from "next-intl/server";
import "@/app/ckeditor5-content.css";
import OurStoryContent from "@/components/our-story/our-story-content";
import CertificatesBanner from "@/components/certificates/certificates-banner";
import { getOurStory } from "@/actions/action";

export default async function OurStory() {
  const locale = await getLocale();
  const story = await getOurStory({ locale });

  return (
    <>
      <OurStoryContent story={story?.data} />
      <CertificatesBanner story={story?.data} />
    </>
  );
}

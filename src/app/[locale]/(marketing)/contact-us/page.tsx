import ContactUsForm from "@/components/forms/contact-us-form";
import { Toaster } from "@/components/ui/sonner";
import { getTranslations } from "next-intl/server";
import DOMPurify from "isomorphic-dompurify";
import PageHero from "@/components/hero/page-hero";
import { getHeroImage } from "@/actions/action";
import { getFulfilledValue } from "@/lib/utils";

export default async function ContactUsPage() {
  const t = await getTranslations("ContactUs");
  const [heroImage] = await Promise.allSettled([getHeroImage()]);

  const heroImg = getFulfilledValue(heroImage, "contact-us.heroImage");

  return (
    <>
      <PageHero
        imageUrl={heroImg?.data?.contactUsHero?.url || ""}
        title={t("contactUs")}
      />
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 my-6">
        <div className="flex flex-col items-center text-center gap-5">
          <div className="space-y-3">
            <p
              data-aos="fade-down"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(t.raw("description")),
              }}
              className="mt-4 max-w-3xl text-lg"
            ></p>
            <p data-aos="fade-down" className="mt-4 max-w-3xl text-lg">
              {t("location")}
            </p>

            <h3
              data-aos="fade-down"
              className="font-semibold text-3xl sm:text-4xl"
            >
              {t("letsCreateTogether")}
            </h3>
          </div>
          <div className="w-full lg:px-20 xl:px-32">
            <div className="min-h-96">
              <ContactUsForm />
            </div>
          </div>
        </div>
      </section>
      <Toaster position={"top-center"} />
    </>
  );
}

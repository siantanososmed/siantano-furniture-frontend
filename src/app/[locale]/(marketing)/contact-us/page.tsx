import { Metadata } from "next";
import ContactUsForm from "@/components/forms/contact-us-form";
import { Toaster } from "@/components/ui/sonner";
import { getLocale, getTranslations } from "next-intl/server";
import PageHero from "@/components/hero/page-hero";
import { getHeroImage } from "@/actions/action";
import { getFulfilledValue } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import {
  Instagram,
  Mail,
  Tiktok,
  Whatsapp,
} from "@/components/icons/custom-icons";
import {
  generatePageMetadata,
  getPageSeo,
  type LocaleType,
} from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as LocaleType;
  const seo = getPageSeo("contactUs", locale);

  return generatePageMetadata({
    title: seo?.title || "Contact Us",
    description: seo?.description || "",
    locale,
    path: "/contact-us",
  });
}

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
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Info and Social */}
          <div className="space-y-6">
            <h2
              data-aos="fade-right"
              className="text-3xl md:text-4xl font-bold text-gray-900"
            >
              {t("getInTouch")}
            </h2>
            <p
              data-aos="fade-right"
              data-aos-delay="100"
              className="text-gray-600 text-base md:text-lg text-justify"
            >
              {t("description")}
            </p>
            <p
              data-aos="fade-right"
              data-aos-delay="200"
              className="text-gray-600 text-base md:text-lg text-justify"
            >
              {t("descriptionSecondary")}
            </p>

            <div data-aos="fade-up" data-aos-delay="300" className="pt-4">
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center gap-4">
                  <Link
                    aria-label="Chat on WhatsApp"
                    href="https://wa.me/6282228262788"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Siantano WhatsApp"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Whatsapp className="h-6 w-6 fill-current" />
                  </Link>
                  <Link
                    aria-label="Chat on WhatsApp"
                    href="https://wa.me/628123252388"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Siantano WhatsApp"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Whatsapp className="h-6 w-6 fill-current" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/siantano_furniture"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Instagram className="h-6 w-6 fill-current" />
                  </Link>
                  <Link
                    href="https://www.tiktok.com/@siantano_furniture"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="TikTok"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Tiktok className="h-6 w-6 fill-current" />
                  </Link>
                  <Link
                    href="mailto:hello@siantanofurniture.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Email"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Mail className="h-6 w-6 fill-current" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div
            data-aos="fade-left"
            className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
          >
            <ContactUsForm />
          </div>
        </div>
      </section>
      <Toaster position={"top-center"} />
    </>
  );
}

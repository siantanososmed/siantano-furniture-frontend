import { Metadata } from "next";
import CareersForm from "@/components/forms/careers-form";
import { getDetailJob, getHeroImage } from "@/actions/action";
import { getFulfilledValue } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { getLocale, getTranslations } from "next-intl/server";
import {
  generateCareerMetadata,
  generateJobPostingSchema,
  type LocaleType,
} from "@/lib/seo";
import PageHero from "@/components/hero/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = (await getLocale()) as LocaleType;

  try {
    const jobResponse = await getDetailJob({ slug });
    const job = jobResponse?.data;

    if (!job) {
      return {
        title: "Job Not Found",
        robots: { index: false, follow: false },
      };
    }

    return generateCareerMetadata(job, locale);
  } catch {
    return {
      title: "Job Not Found",
      robots: { index: false, follow: false },
    };
  }
}

export default async function CareerDetails({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations("Careers");

  const [jobPromise, heroImage] = await Promise.allSettled([
    getDetailJob({ slug }),
    getHeroImage(),
  ]);
  const job = getFulfilledValue(jobPromise, "career.job");
  const heroImg = getFulfilledValue(heroImage, "careers.heroImage");

  // Generate JSON-LD for job posting
  const jobPostingSchema = job?.data
    ? generateJobPostingSchema(job.data, locale)
    : null;

  return (
    <>
      {jobPostingSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
        />
      )}
      <PageHero
        imageUrl={heroImg?.data?.careerHero?.url || ""}
        title={t("careers")}
      />
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 my-10 space-y-6">
        {/* Full-width title + experience */}
        <div className="flex flex-col">
          <span data-aos="fade-down" className="text-3xl font-semibold">
            {job?.data.position}
          </span>
          <span data-aos="fade-down" className="text-muted-foreground font-bold">
            {job?.data.experience}
          </span>
        </div>
        <hr className="border-border" />
        {/* Two-column: description left, form right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Job Description */}
          <article
            data-aos="fade-down"
            className="ck-content ckeditor-result"
            dangerouslySetInnerHTML={{ __html: job?.data.description || "" }}
          />
          {/* Right Column - Application Form */}
          <Card>
            <CardHeader>
              <CardTitle data-aos="zoom-in" className="text-2xl font-semibold">
                {t("applyNow")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CareersForm
                jobSlug={job?.data.slug || slug}
                experience={job?.data.experience || ""}
                position={job?.data.position || ""}
              />
            </CardContent>
          </Card>
        </div>
      </section>
      <Toaster position={"top-center"} />
    </>
  );
}

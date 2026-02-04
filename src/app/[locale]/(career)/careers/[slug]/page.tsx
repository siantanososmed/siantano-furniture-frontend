import { Metadata } from "next";
import CareersForm from "@/components/forms/careers-form";
import { getDetailJob } from "@/actions/action";
import { getFulfilledValue } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { getLocale, getTranslations } from "next-intl/server";
import {
  generateCareerMetadata,
  generateJobPostingSchema,
  type LocaleType,
} from "@/lib/seo";

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

  const [jobPromise] = await Promise.allSettled([getDetailJob({ slug })]);
  const job = getFulfilledValue(jobPromise, "career.job");

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
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 my-6">
        <div className="flex flex-col">
          <span data-aos="fade-down" className="text-3xl font-semibold">
            {job?.data.position}
          </span>
          <span
            data-aos="fade-down"
            className="text-muted-foreground font-bold"
          >
            {job?.data.experience}
          </span>
        </div>
        <article
          data-aos="fade-down"
          className="ck-content ckeditor-result"
          dangerouslySetInnerHTML={{ __html: job?.data.description || "" }}
        ></article>
        <div className="max-w-96 mx-auto space-y-4">
          <div data-aos="zoom-in" className="text-2xl font-semibold">
            {t("applyNow")}
          </div>
          <CareersForm
            jobSlug={job?.data.slug || slug}
            experience={job?.data.experience || ""}
            position={job?.data.position || ""}
          />
        </div>
      </section>
      <Toaster position={"top-center"} />
    </>
  );
}

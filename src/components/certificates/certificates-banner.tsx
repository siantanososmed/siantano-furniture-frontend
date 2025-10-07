import Image from "next/image";

export default function CertificatesBanner({ story }: { story?: OurStoryDto }) {
  return (
    <div className="bg-primary w-full">
      <div className="max-w-screen-xl mx-auto px-4 py-10 sm:px-6 lg:px-8 h-full gap-10 text-primary-foreground flex flex-row justify-center-safe flex-wrap">
        {story?.certificates.map((c) => (
          <div
            key={c.documentId}
            className="w-56 h-40 inline-flex flex-col items-center justify-center gap-5"
          >
            <Image
              src={c.icon.url}
              alt={c.icon.alternativeText || c.tagline}
              className="size-20"
              height={100}
              width={100}
              priority
            />
            <span className="font-bold text-lg">{c.tagline}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
